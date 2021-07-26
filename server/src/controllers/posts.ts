import express, { Request, Response } from 'express';
import { IComment } from '../types/IComment';
import { cloudinaryClient } from '../configs/cloudinary';

import { PostModel } from '../models/Post';

export const router = express.Router();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const Posts = await PostModel.find();

    res.status(200).json(Posts.reverse());
  } catch (error) {
    res.status(404).json({ description: error.description });
  }
};

export const searchPosts = async (req: Request, res: Response) => {
  const { text } = req.params;

  try {
    const posts = await PostModel.find({ $text: { $search: text } });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ description: error.description });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, description, creatorName, creatorImage } = req.body;
  const creator = req.userId;
  const cloudinaryResult = await cloudinaryClient.uploader.upload(req.file.path);
  const selectedFile = cloudinaryResult.secure_url;
  const cloudinaryId = cloudinaryResult.public_id;

  const newPost = new PostModel({
    title,
    description,
    creatorName,
    creator,
    selectedFile,
    cloudinaryId,
    creatorImage,
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
  const { title, description, creatorName, creatorImage } = req.body;
  const creator = req.userId;
  const cloudinaryResult = await cloudinaryClient.uploader.upload(req.file.path);
  const selectedFile = cloudinaryResult.secure_url;
  const cloudinaryId = cloudinaryResult.public_id;

  try {
    const post = await PostModel.findById(id);
    if (!post) return res.status(404).send(`No post with id: ${id}`);

    await cloudinaryClient.uploader.destroy(post.cloudinaryId);

    await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        creator,
        creatorName,
        creatorImage,
        selectedFile,
        cloudinaryId,
        _id: id,
      },
      { new: true },
    );

    const updatedPost = await PostModel.findById(id);

    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

export const commentPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, creatorName, creatorImage } = req.body;
  const creator = req.userId;

  try {
    const post = await PostModel.findById(id);

    if (!post) return res.status(404).send(`No post with id: ${id}`);

    const newComment: IComment = {
      text,
      creator,
      creatorName,
      creatorImage,
    };

    post.comments.unshift(newComment);
    post.save();

    res.json(post);
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await PostModel.findById(id);

  if (!post) return res.status(404).send(`No post with id: ${id}`);

  try {
    await cloudinaryClient.uploader.destroy(post.cloudinaryId);
    await PostModel.findByIdAndRemove(id);
    res.json({ description: 'Post deleted successfully.' });
  } catch (err) {
    console.error(err);
  }
};

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ description: 'Unauthenticated' });
  }

  try {
    const post = await PostModel.findById(id);

    if (!post) return res.status(404).send(`No post with id: ${id}`);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(400).send({ message: 'Something went wrong' });
  }
};
