import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { IPost } from '../models/Post';

import Post from '../models/Post';

const router = express.Router();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const Posts = await Post.find();

    res.status(200).json(Posts.reverse());
  } catch (error) {
    res.status(404).json({ description: error.description });
  }
};

export const searchPosts = async (req: Request, res: Response) => {
  const { text } = req.params;

  try {
    const Posts = await Post.find({ title: text });

    res.status(200).json(Posts);
  } catch (error) {
    res.status(404).json({ description: error.description });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, description, creatorName } = req.body;
  const selectedFile = req.file.filename;
  const creator = (req as any).userId;

  const newPost = new Post({
    title,
    description,
    creatorName,
    creator,
    selectedFile,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ description: error.description });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, creatorName } = req.body;
  const selectedFile = req.file.filename;
  const creator = (req as any).userId;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndUpdate(
    id,
    { title, description, creator, creatorName, selectedFile, _id: id },
    { new: true },
  );

  const updatedPost = await Post.findById(id);

  res.json(updatedPost);
};

export const commentPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, creatorName } = req.body;
  const creator = (req as any).userId;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const newComment: any = {
    text,
    creator,
    creatorName,
  };

  (post as IPost).comments.unshift(newComment);
  (post as IPost).save();

  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  try {
    fs.unlinkSync('./uploads/' + (await (Post.findById(id) as any)).toJSON().selectedFile);
    res.json({ description: 'Post deleted successfully.' });
  } catch (err) {
    console.error(err);
  }

  await Post.findByIdAndRemove(id);
};

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(req as any).userId) {
    return res.json({ description: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const index = (post as IPost).likes.findIndex((id) => id === String((req as any).userId));

  if (index === -1) {
    (post as IPost).likes.push((req as any).userId);
  } else {
    (post as IPost).likes = (post as IPost).likes.filter(
      (id) => id !== String((req as any).userId),
    );
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post as IPost, { new: true });
  res.status(200).json(updatedPost);
};

export default router;
