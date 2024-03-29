const fs = require('fs')
const path = require('path')

/* 读取密钥文件 */
const privateKey = fs.readFileSync(path.join('config','private.key'))
const publicKey = fs.readFileSync(path.join('config','public.key'))

/* 转换成base64格式 */
const privateKeyBase64 = Buffer.from(privateKey).toString('base64')
const publicKeyBase64 = Buffer.from(publicKey).toString('base64')

/* 输出转换结果 */
console.log('私钥base64格式')
console.log(privateKeyBase64)
console.log('公钥base64格式')
console.log(publicKeyBase64)

