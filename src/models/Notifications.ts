import { Schema,  model } from 'mongoose';

const notificationSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    notificationImage: {
        type: String
    }
})

export default model('Notifications', notificationSchema);