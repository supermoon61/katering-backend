import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: {type: String, required: true, unique: true, trim: true},
    description: String,
    slug: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true,},
  },
  {
    timestamps: true,
  }
);

export default model("Categories", categorySchema);
