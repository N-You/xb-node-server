import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';

/* 获取列表内容 */
export const getPosts: any = async () => {
  const statement = `
    SELECT 
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id', user.id,
        'name', user.name
      ) as user
    FROM post
    LEFT JOIN user
      ON user.id = post.userId
  `;
  const [data] = await connection.promise().query(statement);
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
