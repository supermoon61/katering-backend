import {
  Schema,
  model
} from 'mongoose';
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String
  },
  bio: {
    type: String,
  },
  designation: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  profile: {
    type: String,
  },
  location: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  whatsapp: {
    type: Number
  },
  status: {
    type: String,
    required: true,
    default: 'Active'
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    require: true,
    default: false
  }
}, {
  timestamps: true
});
export default model('Users', userSchema);