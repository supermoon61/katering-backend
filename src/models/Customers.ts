import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    stripeId: {
        type: Schema.Types.ObjectId,
        ref: 'Stripes'
      },

    card_brand:{
        type: String,
        default:null,
        trim: true 
    }
    
});
export default model('Customers', customerSchema);