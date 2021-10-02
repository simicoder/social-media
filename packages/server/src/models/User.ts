import mongoose from 'mongoose';
import { IUser } from '../types/IUser';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
