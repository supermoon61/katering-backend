import { Schema, model } from "mongoose";

const businessSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  business_name: {
    type: String,
    default: null,
    trim: true,
  },
  business_email: {
    type: String,
    default: null,
    trim: true,
  },
  business_contact_number: {
    type: String,
    default: null,
    trim: true,
  },
});
export default model("Business", businessSchema);
