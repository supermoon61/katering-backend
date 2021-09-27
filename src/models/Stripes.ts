import { Schema, model } from "mongoose";
const stripeSchema = new Schema(
    {
      User: { type: Schema.Types.ObjectId, ref: 'Users' },
  
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
    export default model("Stripes", stripeSchema);