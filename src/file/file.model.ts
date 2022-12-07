export interface FileModel{
  id?:number,
  originalname:string,
  mimetype:string;
  filename:string;
  size:number;
  userId:number; 
  postId?:number
}