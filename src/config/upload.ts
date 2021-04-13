import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const hashPrefix = crypto.randomBytes(10);

      const filename = `${hashPrefix}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
