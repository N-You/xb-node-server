import {Router} from 'express'
import * as avatatController from './avatar.controller'
import { authGuard } from '../auth/auth.middleware'
import { avatarInterceptor,avatarProcessor } from './avatar.middleware'

const router:Router = Router()

/* 上传头像 */
router.post('/avatar',authGuard,avatarInterceptor,avatarProcessor,avatatController.store )

/* 头像服务 */
router.get('/users/:userId/avatar',avatatController.serve)

export default router