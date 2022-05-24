const marked = require('mark')

module.exports=source=>{
  const html = marked(source)
  return `export default ${JSON.stringify(html)}`

}

class myPlugin{
  apply(compiler){
    console.log('myPlugins启动');
    compiler.hook.emit.tag('MyPlugins',compilation=>{
      // compilation=>可以理解为打包的上下文
      for (const name in compilation.assets) {
        // name 文件名
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()//资源文件内容
          const withiytComments = contents.replace(/\/\*\*+\*\//g,'')
          // 必须这个方法
          compilation.assets[name] = {
            source:()=>withiytComments,
            size:()=>withiytComments.length
          }
        }
      }
    })
  }
}