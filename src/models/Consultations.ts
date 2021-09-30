import { Schema, model } from "mongoose";

const consultationSchema = new Schema({
  planId: {
    type: Schema.Types.ObjectId,
    ref: "Plans",
  },

  name: {
    type: String,
    default: null,
    trim: true,
  },

  email: {
    type: String,
    default: null,
    trim: true,
  },
  contact_number: {
    type: String,
    default: null,
    trim: true,
  },

  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },

  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },

  consultation_date: {
    type: String,
    default: null,
    trim: true,
  },

  job_title: {
    type: String,
    default: null,
    trim: true,
  },

  trading_name: {
    type: String,
    default: null,
    trim: true,
  },

  company_registration_number: {
    type: String,
    default: null,
    trim: true,
  },

  scope_of_business: {
    type: String,
    default: null,
    trim: true,
  },

  product_description: {
    type: String,
    default: null,
    trim: true,
  },

  is_iso_standard: {
    type: Boolean,
    default: null,
    trim: true,
  },

  quality_management: {
    type: String,
    default: null,
    trim: true,
  },

  type_of_cuisine: {
    type: String,
    default: null,
    trim: true,
  },

  menu: {
    type: String,
    default: null,
    trim: true,
  },

  product_assessment_count: {
    type: Number,
    default: null,
    trim: true,
  },
  
  message: {
    type: String,
    default: null,
    trim: true,
  },
});
export default model("Consultations", consultationSchema);
