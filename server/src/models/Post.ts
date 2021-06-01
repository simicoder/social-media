import mongoose, { Document } from 'mongoose';

export interface IPost extends Document {
  title: String;
  description: String;
  creatorName: String;
  selectedFile: String;
  creatorImage: String;
  creator: String;
  likes: string[];
  createdAt: Date;
  comments: string[];
}

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  creatorName: String,
  selectedFile: String,
  creatorImage: { type: String, default: '' },
  creator: String,
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      creatorName: String,
      creatorImage: { type: String, default: '' },
    },
  ],
});

var Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
