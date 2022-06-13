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
+ readFile(path,string,{mode},cb(err))
+ writeFile(path,string,{mode},cb(err))
+ appendFile(path,string,{mode},cb(err))
+ copyFile(path,string,{mode},cb(err))
+ watchFile()