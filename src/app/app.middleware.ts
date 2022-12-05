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
    default:
      statusCode = 500;
      message = '服务器暂时出了问题 ~~';
      break;
  }

  response.status(statusCode).send({ message });
};
