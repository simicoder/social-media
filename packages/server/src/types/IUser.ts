import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  id: string;
  imageUrl: string;
  cloudinaryId: string;
}
