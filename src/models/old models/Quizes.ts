import { Schema, model } from 'mongoose';

var OptionSchema = new Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true
  },
  isTrue: {
    type: Boolean,
    required: true,
    default: false
  },
  selected: {
    type: Boolean,
    required: true,
    default: false
  }
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [OptionSchema],
  negativeMark: {
    type: Number,
    required: true,
    default: -1
  },
  positiveMark: {
    type: Number,
    required: true,
    default: 4
  },
  partialMark: {
    type: Boolean,
    required: true,
    default: false
  },
  tags: [String],
  deficulityLevel: {
    type: String,
    required: true,
    trim: true,
    default: 'Medium'
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
});

const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  attemptCount: Number,
  description: String,
  duration: {
    type: Number,
    required: true,
    default: 120
  },
  isPause: {
    type: Boolean,
    required: true,
    default: false
  },
  language: String,
  status: {
    type: String,
    required: true,
    default: 'Draft'
  },
  questions: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Courses'
  }
}, {
  timestamps: true
});

export default model('Quizes', quizSchema);