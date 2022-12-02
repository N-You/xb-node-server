import express, { Router } from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';

const router: Router = express.Router();

/* 内容列表 */
router.get('/posts', requestUrl, postController.index);

/* 创建内容 */
router.post('/posts', postController.store);

/* 更新数据 */
router.patch('/posts/:postId', postController.update);

/* 删除数据 */
router.delete('/posts/:postId', postController.destroy);

/* 导出路由 */
export default router;
