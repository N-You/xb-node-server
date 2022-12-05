import { Request,Response,NextFunction } from "express";
import * as authService from './auth.service'
import { signToken } from "./auth.service";

/* 用户登录 */
export const login = async(
  request:Request,
  response:Response,
  next:NextFunction
)=>{
  // const { name,password } = request.body
  // response.send({message:`欢迎回来 , ${name}`})

  const {user:{id,name}} = request.body

  const payload = {id,name}

  try{
    const token = signToken({payload})

    // 作出响应
    response.send({id,name,token})
  }catch(error){
    next(error)
  }
}

/* 验证用户登录 */
export const validate = (
  request:Request,
  response:Response,
  next:NextFunction
)=>{
  console.log(request.user);
  
  response.sendStatus(200)
}