import { model, Schema } from 'mongoose';

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    description: {
        type: String,
        trim: true
    },
    discount: {
        type: Number,
        required: true
    },
})

export default model('Coupons', couponSchema);