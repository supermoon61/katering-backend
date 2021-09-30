import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    stripeId: {
        type: Schema.Types.ObjectId,
        ref: 'Stripe'
      },
    card_brand:{
        type: String,
        default:null,
        trim: true 
    }
    
});
export default model('Customers', customerSchema);