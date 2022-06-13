// 重命名文件
// 异步 rename().回调函数没有参数，但可能抛出异常。
fs.rename(oldPath, newPath, callback)

// 截取文件
// 异步 ftruncate().回调函数没有参数，但可能抛出异常。
// 以下为异步模式下截取文件的语法格式：
// fd - 通过 fs.open() 方法返回的文件描述符。
// len - 文件内容截取的长度。
// callback - 回调函数，没有参数。
fs.ftruncate(fd, len, callback)


fs.ftruncateSync(fd, len)
// 同步 ftruncate()

// 写入文件
fs.writeFile(file, data[, options], callback)
// writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。
// 参数
// 参数使用说明如下：
// file - 文件名或文件描述符。
// data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
// options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
// callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

// 读取文件
// 以下为异步模式下读取文件的语法格式：

fs.read(fd, buffer, offset, length, position, callback)
// fd - 通过 fs.open() 方法返回的文件描述符。
// buffer - 数据写入的缓冲区。
// offset - 缓冲区写入的写入偏移量。
// length - 要从文件中读取的字节数。
// position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
// callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象


// 关闭文件
fs.close(fd, callback)
// 该方法使用了文件描述符来读取文件。
// fd - 通过 fs.open() 方法返回的文件描述符。
// callback - 回调函数，没有参数。

// 创建目录
// fs.mkdir(path[, options], callback)
// path - 文件路径。
// options 参数可以是：
// recursive - 是否以递归的方式创建目录，默认为 false。
// mode - 设置目录权限，默认为 0777。
// callback - 回调函数，没有参数。

// 读取目录
// 以下为读取目录的语法格式：
fs.readdir(path, callback)
// path - 文件路径。
// callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。

// 删除目录
// 以下为删除目录的语法格式：
fs.rmdir(path, callback)
var fs = require("fs");
// 执行前创建一个空的 /tmp/test 目录
// console.log("准备删除目录 /tmp/test");
// fs.rmdir("/tmp/test",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("读取 /tmp 目录");
//    fs.readdir("/tmp/",function(err, files){
//       if (err) {
//           return console.error(err);
//       }
//       files.forEach( function (file){
//           console.log( file );
//       });
//    });
// });


const fs = require('fs')
const path = require('path')

// readFile 
/* fs.readFile(path.resolve('data1.txt'), 'utf-8', (err, data) => {
  console.log(err) 
  if (!null) {
    console.log(data)
  }
}) */

// writeFile 
/* fs.writeFile('data.txt', '123', {
  mode: 438,
  flag: 'w+',
  encoding: 'utf-8'
}, (err) => {
  if (!err) {
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      console.log(data)
    })
  }
}) */

// appendFile
/* fs.appendFile('data.txt', 'hello node.js',{},  (err) => {
  console.log('写入成功')
}) */

// copyFile
/* fs.copyFile('data.txt', 'test.txt', () => {
  console.log('拷贝成功')
}) */

// watchFile
fs.watchFile('data.txt', {interval: 20}, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了')
    fs.unwatchFile('data.txt')
  }
})