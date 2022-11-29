import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

// 使用JSON中间件
app.use(express.json());

app.listen(port, () => {
  console.log('服务器已启动~');
});

const data = [
  { id: 1, content: 'one' },
  {
    id: 2,
    content: 'two',
  },
  {
    id: 3,
    content: 'three', 
  },
];

app.get('/posts/:postId', (req: Request, res: Response) => {
  const { postId } = req.params;

  const posts = data.filter(item => item.id == parseInt(postId, 10));

  res.send(posts[0]);
});
