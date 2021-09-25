import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    name: {type: String, required: true}
  },
  {
    timestamps: true,
  }
);

export default model("Files", fileSchema);
