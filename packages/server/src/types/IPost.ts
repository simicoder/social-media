import { Document } from 'mongoose';
import { IComment } from './IComment';

export interface IPost extends Document {
  title: String;
  description: String;
  creatorName: String;
  selectedFile: String;
  creatorImage: String;
  creator: String;
  likes: string[];
  createdAt: Date;
  comments: IComment[];
  cloudinaryId: string;
}
