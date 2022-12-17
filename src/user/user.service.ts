import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

/* 创建用户 */
export const createUser: any = async (user: UserModel) => {
  // 准备查询
  const statement = `
  INSERT INTO user
  SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, user);

  // 提供数据
  return data;
};

/* 获取用户 */
interface GetUserOptions {
  password?: boolean;
}

export const getUser: any = (condition:string)=>{
  return async (
    param: string | number,
    options: GetUserOptions = {},
  ) => {
    const { password } = options;
  
    const statement = `
    SELECT 
    user.id,
    user.name,
    IF (
      COUNT(avatar.id),1,NULL
    ) AS avatar
    ${password ? ',password' : ''}
    FROM 
      user
    LEFT JOIN avatar
      ON avatar.userId = user.id
    WHERE
      ${condition} = ?
    `;
  
    const [data] = await connection.promise().query(statement, param);
  
    return data[0].id ? data[0] : null;
  };
}

/* 按用户名获取用户 */
export const getUserByName= getUser('user.name')

/* 按用户 ID 获取用户 */
export const getUserById = getUser('user.id')

/* 
更新用户
*/
export const updateUser:any = async (
 userId:number,
 userData:UserModel
) => {
  const statement = `
  UPDATE user
  SET ?
  WHERE user.id = ?
  `

  const params = [userData,userId]

  const [data] = await connection.promise().query(statement,params)

  return data
};

/* 
删除用户
*/
export const deleteUser:any = async (
 userId:number
) => {
  const statement = `
  DELETE FROM user
  WHERE id = ?
  `

  const [data] = await connection.promise().query(statement,userId)

  return data
};
