import express, { Express } from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileFouter from '../file/file.router';
import tagRouter from '../tag/tag.router';
import commentRouter from '../comment/comment.router';
import { defaultErrorHandler } from './app.middleware';

//创建应用
const app: Express = express();

//处理JSON
app.use(express.json());

//路由
app.use(
  postRouter,
  userRouter,
  authRouter,
  fileFouter,
  tagRouter,
  commentRouter,
);

// 默认异常处理器
app.use(defaultErrorHandler);

//导出应用
export default app;
