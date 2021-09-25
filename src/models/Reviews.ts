import { Schema, model } from 'mongoose';

export const replySchema = new Schema({
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
}, {
  timestamps: true
})

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
    required: true
  },
  reply: {
    type: [replySchema],
    default: []
  },
}, {
  timestamps: true
});

export default model('Reviews', reviewSchema);