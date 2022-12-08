import { Router } from 'express';
import * as userController from './user.controller';
import { validateUserData, hashPassword } from './user.middleware';

const router: Router = Router();

/* 创建用户 */
router.post('/users', validateUserData, hashPassword, userController.store);

/* 导出路由 */
export default router;
