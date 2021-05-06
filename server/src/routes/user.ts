import express from 'express';
import upload from '../middleware/multerUpload';
import { signin, signup } from '../controllers/user';
import multer from 'multer';

const normalUpload = multer();

const router = express.Router();

router.post('/signin', normalUpload.fields([]), signin);
router.post('/signup', upload.single('selectedFile'), signup);

export default router;
