import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../middleware/cloudinary';
import UserModal from '../models/User';

const secret = 'test';

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email }).lean();

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1d' });

    delete (oldUser as any).password;

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json({ result: oldUser });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
  const imageUrl = cloudinaryResult.secure_url;
  const cloudinaryId = cloudinaryResult.public_id;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModal.create({
      email,
      password: hashedPassword,
      name,
      imageUrl,
      cloudinaryId,
    });

    const result = await UserModal.findOne({ email: newUser.email }).lean();

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, { expiresIn: '1d' });

    delete (result as any).password;

    res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const checkToken = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const oldUser = await UserModal.findOne({ _id: userId }).lean();

    if (!oldUser) return res.json({ message: "User doesn't exist" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1d' });

    delete (oldUser as any).password;

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json({ result: oldUser });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.status(204).json({ message: 'Succesfully logged out!' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
