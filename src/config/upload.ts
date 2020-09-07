import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: unknown;
    aws: {
      bucket: string;
      region: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

const UploadConfig: IUploadConfig = {
  driver: process.env.STORAGE_DRIVER as 's3' | 'disk',
  tmpFolder,
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
    },
  },
};

export default UploadConfig;
