import { Course } from "./Course";
import * as dotenv from "dotenv";
import { Student } from "./Student";
import { ApolloError } from "apollo-server-express";
import * as mongoose from "mongoose";
import Razorpay from "razorpay";
import * as crypto from "crypto";
import {
  ObjectType,
  Field,
  Query,
  Resolver,
  Arg,
  InputType,
  Mutation,
  Ctx,
} from "type-graphql";
import { Payments, Courses, Coupons, Users } from "../models/index";

dotenv.config();

@ObjectType()
class Payment {
  @Field()
  id: string;

  @Field()
  coupon: string;

  @Field()
  amount: string;

  @Field()
  paymentId: string;

  @Field()
  course: Course;

  @Field()
  student: Student;

  @Field()
  status: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
class OrderInput {
  @Field()
  razorpay_payment_id: string;

  @Field()
  razorpay_signature: string;

  @Field()
  courseId: string;

  @Field()
  coupon: string;
}

@InputType()
class OrderDoneInput {
  @Field()
  razorpay_payment_id: string;

  @Field()
  razorpay_order_id: string;

  @Field()
  razorpay_signature: string;

  @Field()
  courseId: string;
}

@Resolver()
export default class PaymentResolver {
  @Query(() => [Payment])
  async payments(): Promise<Payment[]> {
    const data = await Payments.find().populate("student").populate("course");
    return data as any;
  }

  @Query(() => Payment)
  async payment(@Arg("id") id: string): Promise<Payment> {
    const payment = Payments.findById(id)
      .populate("course")
      .populate("student");
    return payment as any;
  }

  @Mutation(() => String)
  async generatePayment(@Arg("data") orderData: OrderInput): Promise<String> {
    let amount = 100;
    const pack = (await Courses.findById(orderData.courseId)) as any;
    if (orderData.coupon) {
      try {
        const couponData = (await Coupons.findOne({
          code: orderData.coupon,
        })) as any;
        amount = (pack.price * (100 - couponData.discount)) / 100;
      } catch (error) {
        amount = pack.price;
      }
    } else {
      amount = pack.price;
    }

    const razorpay = new Razorpay({
      key_id: process.env.PAYMENT_ID,
      key_secret: process.env.PAYMENT_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: orderData.courseId,
      payment_capture: true,
    };
    return await razorpay.orders.create(options);
  }

  @Mutation(() => String)
  async paymentDone(
    @Arg("data") orderData: OrderDoneInput,
    @Ctx() ctx: any
  ): Promise<String> {
    var generatedSignature = crypto
      .createHmac("SHA256", process.env.PAYMENT_SECRET as string)
      .update(orderData.razorpay_order_id + "|" + orderData.razorpay_payment_id)
      .digest("hex");
    var isSignatureValid = generatedSignature == orderData.razorpay_signature;

    const razorpay = new Razorpay({
      key_id: process.env.PAYMENT_ID,
      key_secret: process.env.PAYMENT_SECRET,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    console.log("trihhhhhhhhhh");

    try {
      const order = (await razorpay.orders.fetch(
        orderData.razorpay_order_id
      )) as any;
      orderData.courseId = order.receipt;

      console.log(order);

      if (isSignatureValid) {
        // Load user and its parent
        const userData = (await Users.findById(ctx.user.sub)
          .populate("referredBy")
          .session(session)) as any;

        console.log("UserData", userData);

        // Generate a payment entry for user with course id
        await Payments.create(
          [
            {
              orderId: order.id,
              amount: order.amount / 100,
              package: orderData.courseId,
              user: ctx.user.sub,
            },
          ],
          { session }
        );

        await session.commitTransaction();
        session.endSession();
        // Send email for each ledger generate
        return "Order Placed";
      }

      await session.abortTransaction();
      session.endSession();

      return new ApolloError("Invalid Payment or Signature") as any;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      return new ApolloError(error) as any;
    }
  }
}
