import { ObjectType, Field, Resolver, Query, Mutation, InputType, Arg, ID, Float, Int } from "type-graphql";
import { Reviews } from "../models/index";
import { Course } from "./Course";
import { Student } from "./Student";
import { Reply } from './Reply';

@ObjectType()
class Review {
  @Field(() => ID)
  readonly id: string;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;

  @Field()
  course: Course;

  @Field()
  student: Student;

  @Field()
  status: string;

  @Field(()=>[Reply], {nullable: true})
  reply: [Reply];

  @Field(() => Float)
  readonly createdAt: Date

  @Field(() => Float)
  readonly updatedAt: Date
}


@InputType()
class ReviewInput {
  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;

  @Field(() => ID)
  student: string;

  @Field(() => ID)
  course: string;
}


@Resolver(Review)
export default class ReviewResolver {
  // Review queries start from here

  @Query(() => Review)
  async review(@Arg("id") id: string): Promise<Review> {
    return (await Reviews.findById(id).populate("course").populate("student")) as any;
  }

  @Query(() => [Review])
  async reviews(): Promise<Review[]> {
    return (await Reviews.find().populate("course").populate("student")) as any;
  }

  //Review mutations start from here

  @Mutation(() => String)
  async addReview(@Arg("data") newReview: ReviewInput): Promise<string> {
    await Reviews.create(newReview);
    return "rating has been added";
  }

  // TODO: Delete review

  @Mutation(() => String)
  async deleteReview(@Arg("id") id: string): Promise<string> {
    await Reviews.findByIdAndRemove(id);
    return "Review has been deleted!!";
  }
}