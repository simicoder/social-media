import { Request } from 'express';
import multer from 'multer';

const fileFilter = (
  req: Request,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void,
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
