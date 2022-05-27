# Webpack
+ 可以处理任意文件,以及器引用
+ 生产模式下,自动优化打包结构
+ 开发模式下,自动优化打包速度,添加一些调试过程中的辅助
+ None模式,运行最元素的打包,不做任何额外处理

## 配置文件
+ webpack.config.js -vue.config.js
+ entry 入口
+ output 出口--filename--path
+ 工作模式-mode属性
  - 针对不同环境不同的预设配置
  - --mode development
  - --mode production
  - --mode none

## 打包结果运行原理
+ 把通过函数模块联系起来
+ 默认只会处理js文件

## 资源加载器load
+ 通过不同的load处理不同的文件
+ rules:[
  {test:'处理声明类型的regexp',use:使用声明模块}
]
+ use多个是从后往前执行
+  {test:'\.css$',use:[style-loader,css-loader]}把css改为styel标签
+ import的文件建立了依赖关系
  - 保证资源文件的打包
+ 文件资源加载器
  - file-loader
    - 可以处理图片
+ publishSrc:加上公共的
+ DataURLs
  - base64编码
  - 以代码形式编译,再直接引入
  - 适合小文件.直接在代码中嵌入

## 常用的资源加载器分类
+ 编译转换类型
+ css-loader
+ 文件操作类型
+ file-loader
+ 代码检查加载器
+ eslint-loader


## 处理新特性
+ babel-loader

## 触发模块加载
+ import
+ require
+ Amd require
+ scr @import url herf

## webpack核心工作原理
+ 顺着入口文件分析依赖
+ 生产出依赖器,递归这个依赖数
+ 把loader,把文件转换为可以加载js代码
+ 再打包生成bundle

## 开发一个loader
+ markdown 文件加载器
+ 