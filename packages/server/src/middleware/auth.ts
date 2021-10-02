import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IdecodedData {
  id: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || (req.headers.authorization as string);
    const isCustomAuth = token.length < 500;

    if (token && isCustomAuth) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string) as IdecodedData;

      req.userId = decodedData.id;
    } else {
      const decodedData = jwt.decode(token);
      req.userId = decodedData?.sub as string;
    }

    next();
  } catch (error) {
    res.json({ message: 'Invalid credentials' });
  }
};
