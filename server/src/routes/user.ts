import express from 'express';
import upload from '../middleware/multerUpload';
import auth from '../middleware/auth';
import { signin, signup, checkToken, signOut } from '../controllers/user';
import multer from 'multer';

const normalUpload = multer();

const router = express.Router();

router.post('/signin', normalUpload.fields([]), signin);
router.post('/signup', upload.single('selectedFile'), signup);
router.post('/checktoken', normalUpload.fields([]), auth, checkToken);
router.post('/signout', normalUpload.fields([]), signOut);

export default router;
