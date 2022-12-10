import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { sqlFragment } from './post.provider';

/* 获取列表内容 */
export interface GetPostsOptionsFilter {
  name:string;
  sql?:string;
  param?:any
}

interface GetPostsOptions {
  sort?: string;
  filter?:GetPostsOptionsFilter
}

export const getPosts: any = async (options:GetPostsOptions) => {
  const {sort,filter} = options

  // SQL參數
let params:Array<any> = []

  if(filter.param){
    params = [filter.param,...params]
  }

  const statement = `
    SELECT 
      post.id,
      post.title,
      post.content,
      ${sqlFragment.user},
      ${sqlFragment.totalComments},
      ${sqlFragment.file},
      ${sqlFragment.tags}
    FROM post
    ${sqlFragment.leftJoinUser}
    ${sqlFragment.leftJoinOneFile}
    ${sqlFragment.leftJoinTag}
    WHERE ${filter.sql}
    GROUP BY post.id
    ORDER BY ${sort}
  `;
  const [data] = await connection.promise().query(statement,params);
  return data;
};

/* 创建内容 */
export const createPost: any = async (post: PostModel) => {
  // 准备查询
  const statement = `
    INSERT INTO post
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, post);

  // 提供数据
  return data;
};

/* 更新内容 */
export const updatePost: any = async (postId: number, post: PostModel) => {
  // 准备查询
  const statement = `
  UPDATE post
  SET ?
  WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [post, postId]);

  // 提供数据
  return data;
};

/* 删除内容 */
export const deletePost: any = async (postId: number) => {
  // 准备查询
  const statement = `
  DELETE FROM post
  WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, postId);

  // 提供数据
  return data;
};

/* 保存内容标签 */
export const createPostTag: any = async (postId: number, tagId: number) => {
  const statement = `
  INSERT INTO post_tag (postId, tagId)
  VALUES(?, ?)
  `;

  const [data] = await connection.promise().query(statement, [postId, tagId]);

  return data;
};

/* 
检查标签内容
*/
export const postHasTag: any = async (postId: number, tagId: number) => {
  const statement = `
  SELECT * FROM post_tag
  WHERE postId=? AND  tagId=?
  `;

  const [data] = await connection.promise().query(statement, [postId, tagId]);

  return data[0] ? true : false;
};

/* 移除内容标签 */
export const deletePostTag: any = async (postId: number, tagId: number) => {
  const statement = `
    DELETE FROM post_tag
    WHERE postId = ? AND tagId = ?
    `;

  const [data] = await connection.promise().query(statement, [postId, tagId]);

  return data;
};
