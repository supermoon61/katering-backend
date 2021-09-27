import { Schema, model } from "mongoose";
const planSchema = new Schema(
    {
      User: { type: Schema.Types.ObjectId, ref: 'Users' },
      order_reference: { type: String, trim: true, required: true, unique: true },
     
    },
    {
      timestamps: true,
    },
  )
  
  export default model('Plans', planSchema)