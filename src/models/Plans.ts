import { Schema, model } from "mongoose";
const planSchema = new Schema(
  {
    // User: { type: Schema.Types.ObjectId, ref: 'Users' },
    // order_reference: { type: String, trim: true, required: true, unique: true },
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    identifier: {
      type: String,
      unique: true,
    },
    Stripe: { 
      type: Schema.Types.ObjectId, 
      ref: "Stripes" 
    },
    product_type:{
      type: ['training', 'consultation', 'subscription', 'other'],
      default:'other'
    }
  },
  {
    timestamps: true,
  }
);

export default model("Plans", planSchema);
