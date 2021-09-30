import { Schema,  model } from 'mongoose';

const notificationSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    title: {
        type: String,
        // required: true
        default:null
    },
    body: {
        type: String,
        // required: true
        default:null
    },
    entity_type: {
        type: String,
        default:null
    },
    push_id:{
        type:Number,
        default:null
    },
    read:{
        type: ['Yes', 'No'],
        default:'No'
    }

})

export default model('Notifications', notificationSchema);