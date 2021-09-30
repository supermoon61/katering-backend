import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profile: {
      type: String,
      default: "avatar.png",
    },
    mobile: {
      type: String,
      minlength: 9,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "Active",
    },
    enable: {
      type: Boolean,
      require: true,
      default: true,
    },
    birthday: String,
  },

  {
    timestamps: true,
  }
);

export default model("Students", studentSchema);
