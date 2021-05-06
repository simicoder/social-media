import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  id: string;
  selectedFile: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  selectedFile: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
