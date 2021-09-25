import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Int,
  InputType,
  Arg,
  Mutation,
  ID,
  Float,
  Ctx,
  Authorized,
} from "type-graphql";
import { Users, Requests } from "../models/index";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-express";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import * as fs from "fs";
import PaginatedResponse from "../types/paginated-response.type";
import { checkIntroFolder } from "../utils/makeDirectory";

import { EMailService } from "./../mailer/mail";
import { Context } from "../types/MyContext";
let mailer = new EMailService();

@ObjectType()
class User {
  @Field(() => ID)
  readonly id: string;

  @Field()
  username: string;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  mobile: string;

  @Field({ nullable: true })
  whatsapp: string;

  @Field({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  twitter: string;

  @Field({ nullable: true })
  instagram: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  bio: string;

  @Field(() => Float)
  readonly createdAt: Date;

  @Field(() => Float)
  readonly updatedAt: Date;
}

@ObjectType()
class LoginUser {
  @Field()
  token: String;

  @Field(() => User)
  user: User;
}

@InputType()
class UserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserUpdateInput {
  @Field()
  fullname: string;

  @Field()
  location: string;

  @Field()
  bio: string;

  @Field()
  mobile: string;

  @Field()
  whatsapp: string;
}

@InputType()
class SocialInput {
  @Field()
  facebook: string;

  @Field()
  twitter: string;

  @Field()
  instagram: string;
}

// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
class UserResponse extends PaginatedResponse(User) {
  // you can add more fields here if you need
}

@Resolver(User)
export default class UserResolver {
  // User queries start from here

  @Query(() => User)
  async user(@Arg("id") id: string): Promise<User> {
    return (await Users.findById(id)) as any;
  }

  @Query(() => UserResponse)
  async users(
    @Arg("first", () => Int, { nullable: true }) first: number,
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number
  ): Promise<UserResponse> {
    const users = (await Users.find()) as any;

    const slicedUser =
      first === undefined
        ? users.slice(offset)
        : users.slice(offset, offset + first);
    const total = users.length;
    return {
      items: slicedUser,
      hasMore: total > first,
      total,
    };
  }

  // User mutations start from here

  @Mutation(() => String)
  async registerUser(@Arg("data") newUser: UserInput): Promise<String> {
    const user = (await Users.create({
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 12),
    })) as any;
    // console.log(`http://localhost:3000/verify-email/${user.id}`);
    mailer.sendMail(
      user.email,
      "Confirm Email",
      `link: http://localhost:4000/email-verification/${user.id}`
    );
    return "A verification link has been sent to your email account";
  }

  @Mutation(() => LoginUser)
  async loginUser(
    @Arg("email") email: String,
    @Arg("password") password: String
  ): Promise<LoginUser> {
    const user = (await Users.findOne({ email })) as any;
    const matchPasswords = bcrypt.compareSync(password, user.password);

    if (matchPasswords) {
      const token = jwt.sign(
        {
          payload: { role: user.role, email: user.email, name: user.name },
        },
        "super_secret",
        {
          algorithm: "HS256",
          subject: user.id,
          expiresIn: "1d",
        }
      );
      return { token: token, user: user };
    }
    return new AuthenticationError(
      "Incorect password, please try again!"
    ) as any;
  }

  @Authorized("user")
  @Mutation(() => String)
  async verifyUser(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<String> {
    console.log(ctx);
    const usr = (await Users.findById(id)) as any;
    usr.isVerified = true;
    console.log(ctx.user.sub);
    await usr.save();
    mailer.sendMail(
      usr.email,
      "Welcome",
      `Welcome ${usr.name}! now you can login`
    );
    return "Your email address is successfully verified";
  }

  @Mutation(() => String)
  async updateUser(
    @Arg("id") updatedData: UserUpdateInput,
    @Ctx() ctx: any
  ): Promise<String> {
    await Users.findOneAndUpdate({ _id: ctx.user.sub }, updatedData, {
      new: true,
    });
    return "User successfully updated!";
  }

  @Mutation(() => String)
  async changeUserPassword(
    @Arg("password") password: string,
    @Ctx() ctx: any
  ): Promise<String> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    const userData = (await Users.findById(ctx.user.sub)) as any;
    userData.password = hashedPassword;
    await userData.save();
    return `Password change success`;
  }

  @Mutation(() => String)
  async requestResetUserPassword(@Arg("email") email: string): Promise<String> {
    const user = (await Users.findOne({ email: email })) as any;
    if (user) {
      const date = new Date();
      const request = await Requests.create({
        email: email,
        validity: new Date(date.getTime() + 30 * 60000),
      });

      console.log(`http://localhost:3000/password-reset/${request.id}`);
      mailer.sendMail(
        user.email,
        "Change Password",
        `link: http://localhost:3000/reset-password/${request.id}`
      );
    }
    return `Reset request submitted`;
  }

  @Mutation(() => String)
  async resetUserPassword(
    @Arg("password") password: string,
    @Arg("reqId") reqId: string
  ): Promise<String> {
    const request = (await Requests.findById(reqId)) as any;

    if (!request.isUsed && !request.isAdmin) {
      request.isUsed = true;
      const hashedPassword = bcrypt.hashSync(password, 12);
      const user = (await Users.findOne({ email: request.email })) as any;
      user.password = hashedPassword;
      await request.save();
      await user.save();
      return `Password Reset Successfully!`;
    }
    return `Request is not valid!`;
  }

  @Mutation(() => String)
  async uploadUserPhoto(
    @Arg("url") url: string,
    @Ctx() ctx: any
  ): Promise<String> {
    await Users.findOneAndUpdate({ _id: ctx.user.sub }, { profile: url });
    return "Profile photo updated successfully!";
  }

  @Mutation(() => String)
  async updateUserSocial(
    @Arg("data") updatedData: SocialInput,
    @Ctx() ctx: any
  ): Promise<String> {
    await Users.findOneAndUpdate(
      { _id: ctx.user.sub },
      { ...updatedData },
      { new: true }
    );
    return "User Social contact successfully updated!";
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: string): Promise<String> {
    await Users.findById(id).remove();
    return "User is Deleted";
  }

  @Authorized("user")
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const filpath = `./uploaded/profiles/${filename}`;
      checkIntroFolder.then(() =>
        createReadStream()
          .pipe(fs.createWriteStream(filpath))
          .on("finish", async () => {
            await Users.findOneAndUpdate(
              { _id: ctx.user.sub },
              { profile: filpath },
              { new: true }
            );
            return resolve(true);
          })
          .on("error", (err) => {
            console.log(err);
            return reject(false);
          })
      );
      checkIntroFolder.catch((error) => {
        console.log("rejected", error);
      });
    });
  }
}
