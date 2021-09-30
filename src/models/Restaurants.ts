import { Schema, model } from "mongoose";

const restaurantSchema = new Schema({
  restaurant_category_id: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: false,
    default: null,
  },

  name: {
    type: String,
  },

  fhrs_due_date: {
    type: Number,
  },

  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  minimum_order_value: {
    type: Number,
    default: null,
  },
  delivery_charge: {
    type: Number,
    default: null,
  },
  average_delivery_time: {
    type: String,
    default: null,
  },
  business_phone:{
    type: String,
    default: null
  },
  business_email:{
    type: String,
    default: null
  },
  application_status:{
    
  },
},
{
    timestamps: true,
  }
);

export default model("Restaurant", restaurantSchema);
