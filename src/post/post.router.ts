import { Router } from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { authGuard, accessControl } from '../auth/auth.middleware';
import { sort, filter, paginate } from './post.middleware';
import { POSTS_PER_PAGE } from '../app/app.config';

const router: Router = Router();

/* 内容列表 */
router.get('/posts', sort, filter, paginate(POSTS_PER_PAGE), postController.index);

/* 创建内容 */
router.post('/posts', authGuard, postController.store);

/* 更新数据 */
router.patch(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.update,
);

/* 删除数据 */
router.delete(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.destroy,
);

/* 添加内容标签 */
router.post(
  '/posts/:postId/tag',
  authGuard,
  accessControl({ possession: true }),
  postController.storePostTag,
);

/* 移除标签内容 */
router.delete(
  '/posts/:postId/tag',
  authGuard,
  accessControl({ possession: true }),
  postController.destroyPostTag,
);

/* 单个内容 */
router.get('/posts/:postId',postController.show)

/* 导出路由 */
export default router;
