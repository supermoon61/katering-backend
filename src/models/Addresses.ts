import { Schema, model } from "mongoose";

const addressSchema = new Schema(
    {
      User: { type: Schema.Types.ObjectId, ref: 'Users' },
      
      
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
    export default model("Addresses", addressSchema);