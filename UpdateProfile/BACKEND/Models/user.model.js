import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  phone_no: {
    type: String,
    default: ''
  },

  address: {
    type: String,
    default: ''
  },

  image: {
    type: String, // URL of uploaded image (ImgBB or Cloudinary)
    default: ''
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
