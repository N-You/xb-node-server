import { Request,Response,NextFunction } from "express";
import { createComment, deleteComment, getCommentReplies, getComments, getCommentsTotalCount, isReplyComment, updateComment } from "./comment.service";

/* 
发表评论
*/
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {id:userId} = request.user
  const {content,postId} = request.body

  const comment = {
    content,
    postId,
    userId
  }

  try{
    const data = await createComment(comment)
    response.status(201).send(data)
  }catch(error){
    next(error)
  }
};

/* 
回复评论 
*/
export const reply = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {commentId} = request.params
  const parentId = parseInt(commentId,10)
  const {id:userId} = request.user
  const {content,postId} = request.body

  const comment = {
    content,
    postId,
    userId,
    parentId
  }

  try{
    // 检查评论是否为回复评论
    const reply = await isReplyComment(parentId)

    if(reply) return next(new Error('UNABLE_TO_REPLY_THIS_COMMENT'))
  }catch(error){
    return next(error)
  }

  try{
    // 回复评论
    const data = await createComment(comment)

    response.status(201).send(data)
  }catch(error){
    next(error)
  }
};

/* 
修改评论
*/
export const updata = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {commentId} = request.params
  const {content} = request.body

  const comment = {
    id:parseInt(commentId,10),
    content
  }

  try{
    const data = await updateComment(comment)
    response.send(data)
  }catch(error){
    next(error)
  }
};

/* 
删除评论
*/
export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {commentId} = request.params

  try{
    const data = await deleteComment(parseInt(commentId,10))
    response.send(data)
  }catch(error){
    next(error)
  }
}; 

/* 
评论列表
*/
export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 统计评论数量
  try{
    const totalCount = await getCommentsTotalCount({filter:request.filter})

    response.header('X-Total-Count',totalCount)
  }catch(error){
    next(error)
  }

  // 获取评论列表
  try{
    const comments = await getComments({filter:request.filter,pagination:request.pagination})

    response.send(comments)
  }catch(error){
    next(error)
  }
};

/* 
回复列表
*/
export const indexReplies = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {commentId} = request.params

  try{
    const replies = await getCommentReplies({commentId:parseInt(commentId,10)})

    response.send(replies)
  }catch(error){
    next(error)
  }
};