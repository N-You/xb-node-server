import { Request, Response, NextFunction } from 'express';

//内容列表
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('error', error.message);
  }

  let statusCode: number, message: string;

  //处理异常
  switch (error.message) {
    case `NAME_IS_REQUIRED`:
      message = `请提供用户名`;
      statusCode = 400;
      break;
    case `PASSWORD_IS_REQUIRED`:
      message = `请提供密码`;
      statusCode = 400;
      break;
    case `USER_ALREADY_EXIST`:
      message = `用户已存在`;
      statusCode = 409;
      break;
    case `USER_DOES_NOT_EXIST`:
      message = `用户不存在`;
      statusCode = 400;
      break;
    case `PASSWORD_DOES_NOT_MATCH`:
      message = `用户密码错误`;
      statusCode = 400;
      break;
    case `UNAUTHORIZED`:
      message = `请先登录`;
      statusCode = 401;
      break;
    case `USER_DOES_NOT_OWN_RESOURCE`:
      message = `你不能处理这个内容`;
      statusCode = 403;
      break;
    case `FILE_NOT_FOUND`:
      message = `文件不存在`;
      statusCode = 404;
      break;
    case `TAG_ALREADY_EXISTS`:
      message = `标签已存在`;
      statusCode = 400;
      break;
    case `POST_ALREADY_HAS_THIS_TAG`:
      message = `内容已经存在标签`;
      statusCode = 400;
      break;
    case `UNABLE_TO_REPLY_THIS_COMMENT`:
      message = `无法回复此评论`;
      statusCode = 400;
      break;
    case `FILE_TYPE_NOT_ACCEPT`:
      message = `不能上传此类型文件`;
      statusCode = 400;
      break;
    case `NOT_FOUND`:
      message = `没找到`;
      statusCode = 404;
      break;
    default:
      statusCode = 500;
      message = '服务器暂时出了问题 ~~';
      break;
  }

  response.status(statusCode).send({ message });
};
