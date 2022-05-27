# vueRouter

## 动态路由
+ 动态路由
+ 嵌套路由
+ 编程式导航

## hash模式和history模式的区别
+ hash带#号
  - hash模式式具锚点，以及onhashchange事件
+ history需要服务端配合
  - history模式式以及HTML5的History Api
  - history.pustate
  - history.relaceState
  - 刷新会丢失
## history需要服务端支持
+ 它会发起代理的路由get请求
+ 服务端需要对应响应hmlt模板给客户端
  - 可以配置connect-history-api-callback中间件返回相应资源
+ Nginx服务器配置路由
  - 需要配置路由 nginx.config
  - try_files 尝试寻找这个文件没有则返回index.html
  - 客户端加载完后，会自动加载到这个路由对应的页面，没有则404
  - 启动nginx服务

## VueRoutrer
+ hash模式
  - 路由改变会触发hashchange事件，然后渲染对应的组件
+ History
  - 监听hitorr对象渲染对应的路由
  - 使用hisrory.pushState()等方式改变地址栏，不发生请求

## Router的实现
+ 判断是否已加载，不是才加载，
+ mixin里再beforCreate时，挂载
+ router-link
  - a标签+solt插槽实现
+ router-view组件
  - 注册popstate
  - 找到当前路由对应的组件
  - h渲染函数执行渲染组件


