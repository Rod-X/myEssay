# FileSystem
Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
一般异步都有异步api
## 权限位
用户对应文件所具备的权限
+ 读 r 4
+ 写 w 2
+ 执行 x 1
+ 不具有权限 0
## 标识符
+ r 可读
+ w 可写
+ s 同步
+ +表示执行相反操作
+ x 表示排他操作
+ a 表示追加操作

## 常见的flag操作符


## 常见文件操作APi
cb错误优先
+ readFile(path,string,{mode},cb(err，data))
+ writeFile(path,string,{mode},cb(err，data))
+ appendFile(path,string,{mode},cb(err，data))
+ copyFile(path,string,{mode},cb(err，data))
+ watchFile(path,(curr,prev))

## 文件的打开
```js
// open 
/* fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
  console.log(fd)
}) */

// close
fs.open('data.txt', 'r', (err, fd) => {
  console.log(fd)
  fs.close(fd, err => {
    console.log('关闭成功')
  })
})
```

## 文件的读写
```js
const fs = require('fs')

// read ： 所谓的读操作就是将数据从磁盘文件中写入到 buffer 中
let buf = Buffer.alloc(10)

/**
 * fd 定位当前被打开的文件 
 * buf 用于表示当前缓冲区
 * offset 表示当前从 buf 的哪个位置开始执行写入
 * length 表示当前次写入的长度
 * position 表示当前从文件的哪个位置开始读取
 */
/* fs.open('data.txt', 'r', (err, rfd) => {
  console.log(rfd)
  fs.read(rfd, buf, 1, 4, 3, (err, readBytes, data) => {
    console.log(readBytes)
    console.log(data)
    console.log(data.toString())
  })
}) */

// write 将缓冲区里的内容写入到磁盘文件中
buf = Buffer.from('1234567890')
fs.open('b.txt', 'w', (err, wfd) => {
  fs.write(wfd, buf, 2, 4, 0, (err, written, buffer) => {
    console.log(written, '----')
    fs.close(wfd)
  })
})
```