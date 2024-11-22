import fs from 'fs';
import multer from 'multer';
import path from 'path';
import Exceptions from '../common/exceptions';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const originalPath = file.originalname.split(path.sep).slice(0, -1).join(path.sep);
      const uploadPath = path.join(__dirname, 'uploads', originalPath);
  
      fs.mkdirSync(uploadPath, { recursive: true });
  
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

export const pdfUpload = multer({ dest: 'uploads/pdf', storage, fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(Exceptions.invalidField(['file']));
    }
}});

export const imageUpload = multer({ dest: 'uploads/images', storage, fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(Exceptions.invalidField(['file']));
    }
}});