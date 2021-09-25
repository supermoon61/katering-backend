import { ObjectType, Field, Resolver, Mutation, InputType, Arg, ID, Float } from "type-graphql";
import { Reviews} from "../models/index";

@ObjectType()
export class Usr {

  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

}


@ObjectType()
export class Reply {

  @Field(() => ID)
  id: string;

  @Field()
  comment: string;

  @Field()
  user: Usr;

  @Field(() => Float)
  readonly createdAt: Date

  @Field(() => Float)
  readonly updatedAt: Date
}



@InputType()
class ReplyInput implements Partial<Reply> {

  @Field()
  comment: string
}

@Resolver(Reply)
export default class ReplyResolver {
  @Mutation(() => String)
  async addReply(@Arg("id") id: string, @Arg("data") replydata: ReplyInput): Promise<string> {
    const review = Reviews.findById(id);
    await review.updateOne({ $push: { reply: replydata } });
    return "Reply has been added!!";
  }
}