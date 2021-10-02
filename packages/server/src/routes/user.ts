import express from 'express';
import { upload } from '../middleware/multerUpload';
import { auth } from '../middleware/auth';
import { signin, signup, checkToken, signOut } from '../controllers/user';
import multer from 'multer';

const normalUpload = multer();

export const userRouter = express.Router();

userRouter.post('/signin', normalUpload.fields([]), signin);
userRouter.post('/signup', upload.single('selectedFile'), signup);
userRouter.post('/checktoken', normalUpload.fields([]), auth, checkToken);
userRouter.post('/signout', normalUpload.fields([]), signOut);
