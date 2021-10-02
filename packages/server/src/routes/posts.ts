import express from 'express';
import {
  getPosts,
  searchPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
  commentPost,
} from '../controllers/posts';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/multerUpload';

export const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/search/:text', searchPosts);
postsRouter.post('/', upload.single('selectedFile'), auth, createPost);
postsRouter.patch('/:id', upload.single('selectedFile'), auth, updatePost);
postsRouter.patch('/comment/:id', auth, commentPost);
postsRouter.delete('/:id', auth, deletePost);
postsRouter.patch('/:id/likePost', auth, likePost);
