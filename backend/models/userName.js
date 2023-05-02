import mongoose, { Schema } from 'mongoose';

//mondodb Schema
const userSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
});

export default mongoose.model('user', userSchema);
