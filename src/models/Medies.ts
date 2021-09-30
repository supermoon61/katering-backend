import { Schema, model } from "mongoose";

const mediaSchema = new Schema({
  model: {
    type: String,
    trim: true,
  },

  collection_name: {
    type: String,
    trim: true,
  },

  name: {
    type: String,
    trim: true,
  },

  file: {
    type: Schema.Types.ObjectId,
    ref: "Files",
  },

  mime_type: {
    type: String,
    trim: true,
    default: null,
  },

  disk: {
    type: String,
    trim: true,
  },

  size: {
    type: Number,
    trim: true,
  },

  manipulations: {
    type: String,
    trim: true,
  },

  custom_properties: {
    type: String,
    trim: true,
  },

  responsive_images: {
    type: String,
    trim: true,
  },
  
  order_column: {
    type: Number,
    trim: true,
    default: null,
  },
});
export default model("Medies", mediaSchema);
