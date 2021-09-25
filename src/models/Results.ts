import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
  },
  exams: {
    type: Schema.Types.ObjectId,
    ref: 'examseries',
  },
  status: {
    type: String,
    required: true,
  }
},
  {
    timestamps: true
});

export default model('Results', resultSchema);
