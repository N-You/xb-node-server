import jwt from 'jsonwebtoken'
import { connection } from '../app/database/mysql'
import { PRIVATE_KEY } from '../app/app.config'

/* 签发信息 */
interface SignTokenOptions{
  payload?:any
}

export const signToken = (options:SignTokenOptions) =>{
  const {payload} = options

  // 签发 JWT 
  const token = jwt.sign(payload,PRIVATE_KEY,{algorithm:'RS256'})//RS256加密算法

  // 提供JWT
  return token
}