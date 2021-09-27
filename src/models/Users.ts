import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    first_name: { type: String, trim: true, default: '' },
    last_name: { type: String, trim: true, default: '' },
    bio: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    profile: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    whatsapp: {
      type: Number,
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
    role: {
      type: String,
      required: true,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      require: true,
      default: false,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'Plans'
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    stripeId: {
      type: Schema.Types.ObjectId,
      ref: 'Stripe'
    }
    
  },
  {
    timestamps: true,
  });

export default model("Users", userSchema);
