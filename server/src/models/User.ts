import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  id: string;
  imageUrl: string;
  cloudinaryId: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
