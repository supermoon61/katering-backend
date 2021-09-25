import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({

  coupon: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: Number,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Students'
  },
  status: {
    type: String,
    required: true,
    default:'Paid'
  }
},
  {
    timestamps: true
  });

export default model('Payments', paymentSchema);
