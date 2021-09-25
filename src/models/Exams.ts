import { Schema, model } from 'mongoose';

const examSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
  },
  categories: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
  },
  mrp: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },

  quizCount: {
    type: Number,
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  quizes: {
    type: [Schema.Types.ObjectId],
    ref: 'Quizes'
  }
},
  {
    timestamps: true
  });


export default model('Exams', examSchema);