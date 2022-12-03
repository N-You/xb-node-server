import { connection } from "../app/database/mysql";
import { UserModel} from './user.model'

/* 创建用户 */
export const createUser:any = async (user:UserModel) =>{
  // 准备查询
  const statement = `
  INSERT INTO user
  SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement,user)

  // 提供数据
  return data
}

/* 按用户名查用户 */
interface GetUserOptions{
  password?: boolean
}

export const getUserByName:any = async(name:string,options:GetUserOptions = {})=>{
  const {password} = options

  const statement = `
  SELECT 
  id,
  name
  ${ password ? ',password' : '' }
  FROM user
  WHERE name = ?
  `

  const [data] = await connection.promise().query(statement,name)

  return data[0]
}