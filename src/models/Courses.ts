import { Schema, model } from "mongoose";

const Content = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      default: "subtitle",
    },
    description: {
      type: String,
      required: true,
      default: "description",
    },
    item: {
      type: String,
      required: true,
    },
    resources: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["LECTURE", "ASSIGNMENT", "QUIZ", "RESOURCE"],
      default: "LECTURE",
    },
    isFree: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Section = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    default: "description",
  },
  contents: {
    type: [Content],
    default: [],
  },
});

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    banner: {
      type: String,
      default: "banner.png",
    },
    intro: {
      type: String,
      default: "intro.mp4",
    },
    description: {
      type: String,
      required: true,
      default: "Sample Descriptions",
    },
    mrp: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    language: {
      type: String,
      trim: true,
    },

    slug: { 
      type: String, 
      required: true,
      unique: true 
    },

    tags: {
      type: [String],
      default: [],
    },

    sections: {
      type: [Section],
      default: [],
    },

    tutors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tutors",
        default: [],
      },
    ],

    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        default: [],
      },
    ],

    status: {
      type: String,
      required: true,
      enum: ["DRAFT", "PUBLISHED", "DELETED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Courses", courseSchema);
