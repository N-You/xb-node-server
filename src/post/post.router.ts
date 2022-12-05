import  { Router } from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { authGuard,accessControl } from '../auth/auth.middleware';

const router: Router = Router();

/* 内容列表 */
router.get('/posts', requestUrl, postController.index);

/* 创建内容 */
router.post('/posts',authGuard, postController.store);

/* 更新数据 */
router.patch('/posts/:postId',authGuard,accessControl({possession:true}), postController.update);

/* 删除数据 */
router.delete('/posts/:postId', authGuard,accessControl({possession:true}),postController.destroy);

/* 导出路由 */
export default router;
