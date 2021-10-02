declare module Express {
  export interface Request {
    userId: string;
    file: Express.Multer.File;
  }
}
