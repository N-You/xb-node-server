import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

/* 创建一个 Multer */
const fileUpload = multer({
  dest: 'uploads/',
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
