# path 模块

## path.join() 方法
用来将多个路径片段拼接成一个完整的路径字符串
```js
/把多个路径片段拼接为完整的路径字符串
/格式: path.join([...paths]);
fs.readFile(path.join(__dirname,"./files/1.txt"),"utf-8",function (err,dataStr) { 
  if(err){
    return console.log(`读取错误 ${err.message}`);
  }
  console.log(dataStr);
 })


​ …/ 会抵消前面相邻的路径

const pathStr=path.join("/a","/b/c","../","./d","e");
console.log(pathStr);  // 输出 \a\b\d\e
```
## path.dirname
```js
// 2 获取路径目录名 (路径)
/**
 * 01 返回路径中最后一个部分的上一层目录所在路径
 */
console.log(__dirname,'__dirname')
console.log(__filename,'__filename')
console.log(path.dirname(__filename))
console.log(path.dirname('/a/b/c'))
console.log(path.dirname('/a/b/c/'))
```


