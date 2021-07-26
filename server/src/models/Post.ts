import mongoose from 'mongoose';
import { IPost } from '../types/IPost';

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  creatorName: String,
  selectedFile: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  creatorImage: { type: String, default: '' },
  creator: String,
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      creator: String,
      creatorName: String,
      creatorImage: { type: String, default: '' },
    },
  ],
});

postSchema.index({ title: 'text', description: 'text' });

export const PostModel = mongoose.model<IPost>('Post', postSchema);
