import {
  ObjectType,
  Field,
  Resolver,
  Query,
  InputType,
  Arg,
  Mutation,
  ID,
  Int,
  Float,
  Authorized,
} from "type-graphql";
import { Courses } from "../models/index";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import slugify from "slugify";
import * as fs from "fs";
import PaginatedResponse from "../types/paginated-response.type";
import { checkBannerFolder } from "../utils/makeDirectory";

@ObjectType({ description: "The course model" })
export class Course {
  @Field(() => ID)
  readonly id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  banner: string;

  @Field()
  intro: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  mrp: number;

  @Field(() => [String])
  tags: [String];

  @Field(() => [Section])
  sections: [Section];

  @Field()
  slug: string;

  @Field()
  status: string;

  @Field(() => Float)
  readonly createdAt: Date;

  @Field(() => Float)
  readonly updatedAt: Date;
}

@ObjectType()
class Section {
  @Field(() => ID)
  readonly id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Content])
  contents: [Content];
}

@ObjectType()
class Content {
  @Field(() => ID)
  readonly id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  item: string;

  @Field()
  resources: string;

  @Field()
  type: string;

  @Field()
  isFree: boolean;
}

@InputType()
class CourseUpdateInput implements Partial<Course> {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  description: string;

  @Field(() => [String])
  tags: [String];
}

@InputType()
class SectionUpdateInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
class ContentUpdateInput {
  @Field(() => ID)
  readonly id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  item: string;

  @Field()
  resources: string;

  @Field()
  type: string;

  @Field()
  isFree: boolean;
}

// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
class CourseResponse extends PaginatedResponse(Course) {
  // you can add more fields here if you need
}

@Resolver()
export default class CourseResolver {
  // User queries start from here
  @Query(() => Course)
  async course(@Arg("id") id: string): Promise<Course> {
    return (await Courses.findById(id)) as any;
  }

  @Query(() => CourseResponse)
  async courses(
    @Arg("first", () => Int, { nullable: true }) first: number,
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number
  ): Promise<CourseResponse> {
    const courses = (await Courses.find()) as any;

    const slicedCourse =
      first === undefined
        ? courses.slice(offset)
        : courses.slice(offset, offset + first);
    const total = courses.length;
    return {
      items: slicedCourse,
      hasMore: total > first,
      total,
    };
  }

  // Course mutations start from here

  @Mutation(() => Course)
  async addCourse(@Arg("title") title: string): Promise<Course> {
    const course = await Courses.create({
      title: title,
      slug: slugify(title, { lower: true }),
    });
    return course as any;
  }

  @Mutation(() => String)
  async updateCourse(
    @Arg("data") updatedCourse: CourseUpdateInput,
    @Arg("id") id: string
  ): Promise<String> {
    await Courses.findByIdAndUpdate(id, updatedCourse);
    return "Course Updated successfully";
  }

  @Mutation(() => String)
  async updateIntro(
    @Arg("videoUrl") url: String,
    @Arg("id") id: string
  ): Promise<String> {
    await Courses.findByIdAndUpdate(id, { intro: url });
    return "Course Updated successfully";
  }

  @Mutation(() => String)
  async changeCourseStatus(@Arg("courseId") courseId: string): Promise<String> {
    const course = (await Courses.findById(courseId)) as any;
    try {
      if (course.status == "DRAFT") {
        course.title = "PUBLISHED";
      } else {
        course.status = "DRAFT";
      }
      course.save();
      return "course status changed successfully";
    } catch (error) {
      return "status is not change";
    }
  }

  @Mutation(() => String)
  async deleteCourse(@Arg("courseId") courseId: string): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId },
      { $set: { status: "DELETED" } }
    );
    return "Course is deleted successfully";
  }

  @Mutation(() => String)
  async addCourseTutor(
    @Arg("userId") userId: string,
    @Arg("courseId") courseId: string
  ): Promise<String> {
    await Courses.findByIdAndUpdate(courseId, { $push: { tutors: userId } });
    return "Tutor added successfully";
  }

  @Mutation(() => String)
  async removeCourseTutor(
    @Arg("courseId") courseId: string,
    @Arg("userId") userId: string
  ): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId },
      { $pull: { tutors: userId } }
    );
    return "Tutor removed from course successfully";
  }

  @Mutation(() => String)
  async updateCourseCategory(
    @Arg("categoryId") categoryId: string,
    @Arg("courseId") courseId: string
  ): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId },
      { $set: { category: categoryId } }
    );
    return "Course Category changed successfully";
  }

  @Mutation(() => String)
  async addSection(
    @Arg("courseId") courseId: string,
    @Arg("data") sectionData: SectionUpdateInput
  ): Promise<String> {
    const course = Courses.findById(courseId);
    await course.updateOne({ $push: { sections: sectionData } });
    return "Section added successfully";
  }

  @Mutation(() => String)
  async updateSection(
    @Arg("data") sectionData: SectionUpdateInput,
    @Arg("courseId") courseId: string,
    @Arg("sectionId") sectionId: string
  ): Promise<String> {
    const course = (await Courses.findById(courseId)) as any;
    course.update(
      { "sections.id": sectionId },
      {
        $set: {
          "sections.$.title": sectionData.title,
          "sections.$.description": sectionData.description,
        },
      }
    );
    return "Section updated successfully";
  }

  @Mutation(() => String)
  async deleteSection(
    @Arg("courseId") courseId: string,
    @Arg("sectionId") sectionId: string
  ): Promise<String> {
    Courses.findOneAndUpdate(
      { _id: courseId },
      { $pull: { sections: { _id: sectionId } } },
      { multi: true }
    );
    return "Section deleted successfully";
  }

  @Mutation(() => String)
  async addContent(
    @Arg("courseId") courseId: string,
    @Arg("sectionId") sectionId: string,
    @Arg("data") contentData: SectionUpdateInput
  ): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId, "sections._id": sectionId },
      { $push: { "sections.$.contents": contentData } }
    );
    return "content added successfully";
  }

  @Mutation(() => String)
  async updateContent(
    @Arg("courseId") courseId: string,
    @Arg("contentId") contentId: string,
    @Arg("sectionId") sectionId: string,
    @Arg("data") contentData: ContentUpdateInput
  ): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId, "sections._id": sectionId, "contents._id": contentId },
      { $set: { "sections.$.$.item": contentData } }
    );
    return "Content updated successfully";
  }

  @Mutation(() => String)
  async updateContentResource(
    @Arg("courseId") courseId: string,
    @Arg("contentId") contentId: string,
    @Arg("sectionId") sectionId: string,
    @Arg("resource") resource: string
  ): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId, "sections._id": sectionId, "contents._id": contentId },
      { $set: { "sections.$.$.item.$.resources": resource } }
    );
    return "Content Resource updated successfully";
  }

  @Mutation(() => String)
  async deleteContent(
    @Arg("contentId") contentId: string,
    @Arg("courseId") courseId: string,
    @Arg("sectionId") sectionId: string
  ): Promise<String> {
    await Courses.findOneAndUpdate(
      { _id: courseId, "sections._id": sectionId, "contents._id": contentId },
      { $pull: { contents: { _id: contentId } } },
      { multi: true }
    );
    return "Content deleted successfully";
  }

  @Authorized("admin")
  @Mutation(() => Boolean)
  async updateBanner(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Arg("courseId") courseId: string
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const filpath = `./uploaded/banners/${filename}`;
      checkBannerFolder.then(() =>
        createReadStream()
          .pipe(fs.createWriteStream(filpath))
          .on("finish", async () => {
            await Courses.findOneAndUpdate(
              { _id: courseId },
              { banner: filpath },
              { new: true }
            );
            return resolve(true);
          })
          .on("error", (err) => {
            console.log(err);
            return reject(false);
          })
      );
      checkBannerFolder.catch((error) => {
        console.log("rejected", error);
      });
    });
  }
}
