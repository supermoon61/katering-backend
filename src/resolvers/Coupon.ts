import { ObjectType, Field,  Query, Resolver, Arg, InputType, Int, ID, Mutation }  from "type-graphql";
import { Coupons } from '../models/index';

@ObjectType()
    class Coupon{

        @Field(()=>ID)
        id: string

        @Field()
        code: string

        @Field()
        description: string

        @Field(()=>Int)
        discount:number
    }
   
    @InputType()
    class CouponInput{
        @Field()
        code: string

        @Field()
        description: string

        @Field(()=>Int)
        discount: number
    }



    @Resolver()
    export default class CouponResolver{

        //Coupen Querry

        @Query(()=>[Coupon])
        async Coupons(): Promise<Coupon[]>{
            return (await Coupons.find()) as any;
        }

        @Query(()=>Coupon)
        async Coupon(@Arg("id") id: string): Promise<Coupon>{
            return (await Coupons.findById(id)) as any;
        }

         //coupen  mutation 

        @Mutation(()=>Coupon)
        async addCoupon(@Arg("data") newCoupon:CouponInput): Promise<Coupon>{
           return (await Coupons.create(newCoupon)) as any;
        }
       
        @Mutation(()=>Coupon)
        async updateCoupon(@Arg("data") updatedCoupon:CouponInput, @Arg("id") id:string): Promise<Coupon>{
           return (await Coupons.findByIdAndUpdate(id, updatedCoupon)) as any;
        }
        
     
        @Mutation(()=>Coupon)
        async deleteCoupon(@Arg("id") id:String): Promise<Coupon>{
           return (await Coupons.findByIdAndRemove(id)) as any;
        }



    }



