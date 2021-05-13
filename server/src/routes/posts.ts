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
import auth from '../middleware/auth';
import upload from '../middleware/multerUpload';

const router = express.Router();

router.get('/', getPosts);
router.get('/search/:text', searchPosts);
router.post('/', upload.single('selectedFile'), auth, createPost);
router.patch('/:id', upload.single('selectedFile'), auth, updatePost);
router.patch('/comment/:id', auth, commentPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
