import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
    },
    bio: {
      type: String,
    },
    designation: {
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
    
  },
  {
    timestamps: true,
  });
  
const UserToken = new Schema(
  {
    id: { 
      type: Number, 
      required: true 
    },
    user_id: { 
      type: Number, 
      required: true 
    },
    token: { 
      type: String, 
      trim: true, 
      required: true, 
      unique: true 
    },
    platform: { 
      type: String, 
      trim: true, 
      required: true 
    },
    version: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

  });

const UserAddress = new Schema(
  {
    id: 
    { 
      type: Number, 
      required: true 
    },

    user_id: 
    { 
      type: Number, 
      required: true 
    },

    address_line_1:
     { 
      type: String, 
      trim: true, 
      required: true 
    },

    address_line_2: 
    { 
      type: String, 
      trim: true, 
      default: null 
    },

    town:
     { 
      type: String, 
      trim: true 
    },

    county: 
    { 
      type: String,
       trim: true
       },
    postcode: 
    { 
      type: String, 
      trim: true 
    },
    latitude: 
    { 
      type: Number, 
      trim: true, 
      default: null 
    },
    longitude: 
    { 
      type: Number, 
      trim: true, 
      default: null 
    },
  });

const UserStripe = new Schema(
  {
    id: 
    { 
      type: Number, 
      required: true 
    },

    user_id: 
    { 
      type: Number, 
      required: true 
    },

    stripe_account_id: 
    { 
      type: String, 
      trim: true, 
      required: true 
    },

    payment_method_id: 
    { 
      type: String, 
      trim: true, 
      default: null 
    },

    card_last_four: 
    { 
      type: Number, 
      trim: true, 
      default: null 
    },

    expiry_month: 
    { 
      type: Number, 
      trim: true, 
      default: null
     },

    expiry_year: 
    { type: Number, 
      trim: true,
       default: null 
      },
  });

const UserPlan = new Schema(
  {
    id: 
    { 
      type: Number, 
      required: true 
    },

    user_id: 
    { 
      type: Number, 
      required: true 
    },

    order_reference: 
    { 
      type: String, 
      trim: true, 
      required: true, 
      unique: true 
    },

    plan_id: 
    { 
      type: Number, 
      trim: true }
      ,
  },
  {
    timestamps: true,
  });

export default model("Users", userSchema);
