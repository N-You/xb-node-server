export interface CommentModel {
  id?:number;
  content?:string;
  postId?:number;
  userId?:number;
  parentId?:number
}