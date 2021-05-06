import { Request, Response } from 'express';
import User from '../models/User';
import path from 'path';
import { IUser } from '../models/User';

export const getPostImage = async (req: Request, res: Response) => {
  const { filename } = req.params;
  try {
    res.sendFile('uploads/' + filename, { root: path.resolve() });
  } catch (error) {
    res.status(404).json({ description: error.description });
  }
};

export const getUserImage = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    res.sendFile('uploads/' + (user as IUser).selectedFile, { root: path.resolve() });
  } catch (error) {
    res.status(404).json({ description: error.description });
  }
};
