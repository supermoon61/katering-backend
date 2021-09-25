import { ObjectType, Field, Resolver, Query, Mutation, Arg, InputType, ID, Float } from "type-graphql";
import { Students } from "../models/index";

@ObjectType()
export class Student {
  @Field(() => ID)
  readonly id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  mobile: string;

  @Field(() => Float)
  readonly createdAt: Date

  @Field(() => Float)
  readonly updatedAt: Date
}

@InputType()
class StudentInput implements Partial<Student> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  mobile: string;
}


@Resolver()
export default class StudentResolver {

  //Student query
  @Query(() => [Student])
  async students(): Promise<Student[]> {
    const data = await Students.find({})
    return data as any;
  }

  @Query(() => Student)
  async student(@Arg("id") id: string): Promise<Student> {
    const student = await Students.findById(id).exec();
    return student as any;
  }

  //Student mutation
  @Mutation(() => Student)
  async registerStudent(@Arg("data") newStudent: StudentInput): Promise<Student> {
    const student = await Students.create(newStudent);
    return student as any;
  }

  @Mutation(() => String)
  async deleteStudent(@Arg("id") id: string): Promise<string> {
    await Students.findByIdAndRemove(id);
    return "student has been deleted!!";
  }

  @Mutation(() => Student)
  async updateStudent(@Arg("data") updatedStudent: StudentInput, @Arg("id") id: string): Promise<Student> {
    const student = await Students.findByIdAndUpdate(id, updatedStudent);
    return student as any;
  }
}