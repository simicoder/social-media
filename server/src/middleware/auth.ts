import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'test';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret) as any;

      (req as any).userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      (req as any).userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

export default auth;
