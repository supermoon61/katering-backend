import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },

    token:{
        type: String,
        trim: true 
    },
    platform:{
        type: String,
        trim: true 
    },
    version:{
        type: String,
        trim: true 
    }
});
export default model('Tokens', tokenSchema);