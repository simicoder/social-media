import express from 'express';
import { getPostImage, getUserImage } from '../controllers/files';

const router = express.Router();

router.get('/:filename', getPostImage);
router.get('/profile/:userId', getUserImage);

export default router;
