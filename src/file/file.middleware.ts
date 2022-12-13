import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

/* 文件过滤器 */
export const fileFilter = (fileTypes: Array<string>) => {
  return (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ) => {
    console.log(file.mimetype);
    console.log(fileTypes);

    // 检测文件类型
    const allowed = fileTypes.some(type => {
      return type === file.mimetype;
    });

    // 通过就允许上传
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('FILE_TYPE_NOT_ACCEPT'));
    }
  };
};

const fileUploadFilter = fileFilter(['image/png', 'image/jpg', 'image/jpeg']);

/* 创建一个 Multer */
const fileUpload = multer({
  dest: 'uploads/',
  fileFilter: fileUploadFilter,
});
/* 文件拦截器 */
export const fileInterceptor: any = fileUpload.single('file');

/* 
文件处理
*/
export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { path } = request.file;

  let image: Jimp;

  try {
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }

  // console.log(image);

  const { imageSize, tags } = image['_exif'];

  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  // 调整图像尺寸
  imageResizer(image, request.file);

  next();
};
