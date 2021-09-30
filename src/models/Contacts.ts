import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },

      message:{
        type: String,
        default: null,
        trim: true 

    },
    
});
export default model('Contacts', contactSchema);