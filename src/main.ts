const http = require('http')

const server = http.createServer((req, res) =>{
  const data = "<input />"

  const jsonData = JSON.stringify(data)

  res.writeHead(200,{
    'Content-Type': 'text/html' 
  })

  res.write(data)

  res.end();
})

server.listen(8000, () =>{
  console.log('服务器已启动');
})
