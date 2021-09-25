import { Schema, model } from 'mongoose';

const requestSchema = new Schema({
  email: { type: String, required: true },
  validity: { type: Date, required: true },
  isUsed: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false }
}, {
  timestamps: true
});

export default model('Requests', requestSchema);