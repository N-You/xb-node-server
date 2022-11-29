import express, { Router } from 'express'
import * as postController from './post.controller'
import { requestUrl } from '../app/app.middleware'

const router:Router = express.Router()

// 内容列表
router.get('/posts',requestUrl,postController.index)

// 导出路由
export default router