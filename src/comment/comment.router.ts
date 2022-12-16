import { Router } from 'express';
import { COMMENTS_PER_PAGE } from '../app/app.config';
import { paginate } from '../post/post.middleware';
import { accessControl, authGuard } from '../auth/auth.middleware';
import * as commentController from './comment.controller';
import { filter } from './comment.middleware';

const router: Router = Router();

/* 发表评论 */
router.post('/comments', authGuard, commentController.store);

/* 回复评论 */
router.post('/comments/:commentId/reply', authGuard, commentController.reply);

/* 修改评论 */
router.patch(
  '/comments/:commentId',
  authGuard,
  accessControl({ possession: true }),
  commentController.updata,
);

/* 删除评论 */
router.delete(
  '/comments/:commentId',
  authGuard,
  accessControl({ possession: true }),
  commentController.destroy
);

// 评论列表
router.get('/comments',paginate(COMMENTS_PER_PAGE),filter,commentController.index)

/* 回复列表 */
router.get('/comments/:commentId/replies',commentController.indexReplies)

export default router;
