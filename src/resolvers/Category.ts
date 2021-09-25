import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg } from "type-graphql";
import { Categories } from "../models/index";
import slugify from 'slugify';

@ObjectType()
class Category {

  @Field()
  readonly id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  slug: string

  @Field()
  readonly createdAt: Date

  @Field()
  readonly updatedAt: Date
}

@InputType()
class CategoryInput {
  @Field()
  title: string;

  @Field({nullable: true})
  description: string;

  @Field({nullable: true})
  slug: string;
}

@Resolver()
export default class CategoryResolver {

  // Category queries

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return (await Categories.find()) as any;
  }

  @Query(() => [Category])
  async category(@Arg("id") id: string): Promise<Category[]> {
    return (await Categories.findById(id)) as any;
  }

  // Category mutation

  @Mutation(() => Category)
  async addCategory(@Arg("data") newCategory: CategoryInput): Promise<Category> {
    if (!newCategory.slug) {
      newCategory.slug = slugify(newCategory.title, {
        lower: true
      })
    }
    return (await Categories.create(newCategory)) as any;
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: string): Promise<string> {
    await Categories.findById(id).remove();
    return "Category deleted";
  }

  @Mutation(() => String)
  async updateCategory(@Arg("data") updatedCategory: CategoryInput, @Arg("id") id: string): Promise<string> {
    if (!updatedCategory.slug) {
      updatedCategory.slug = slugify(updatedCategory.title, {
        lower: true
      })
    }
    await Categories.findByIdAndUpdate(id, updatedCategory)
    return "updated category!!"
  }
}