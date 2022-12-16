import { Request,Response,NextFunction } from "express";

/* 
过滤器
*/
export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {post,user,action} = request.query

  // 默认过滤
  request.filter = {
    name:'default',
    sql:'comment.parentId IS NULL'
  }

  // 内容id过滤
  if(post && !user && !action){
    request.filter = {
      name:'postComments',
      sql:'comment.parentId IS NULL AND comment.postId = ?',
      param:post
    }
  }

// 用户评论
if(!post && user && action== 'published'){
  request.filter = {
    name:'userPublished',
    sql:'comment.parentId IS NULL AND comment.userId = ?',
    param:user
  }
}

// 用户回复评论
if(user && action == 'replied' && !post){
  request.filter={
    name:'userReplied',
    sql:'comment.parentId IS NOT NULL AND comment.userId = ?',
    param:user
  }
}

  next()
};