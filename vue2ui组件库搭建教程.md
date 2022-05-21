## 登录npm
```
<!-- 登录注意点npm的源必须是npm初始源而非淘宝源 -->
<!-- 可以使用 nrm 源管理器控制 nrm ls 查看源清单 -->
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/


非上面npm源需要切换

npm set registry https://registry.npmjs.org/


<!--注册完账号后 先登录 -->
npm login 

```

## 修改package.json

```json
{
    // *号标注为必备属性
    //*npm会识别你的名字以及是否有这个名字仓库的发布全选
  "name": "element-ui",
    //*库的版本号，每次发布必须更新版本，否则不能发布成功
  "version": "2.15.8",
    // 是否为私有库-为true不能发布，不存在时默认为false
  "private": false,
    // 这个库的介绍
  "description": "A Component Library for Vue.js.",
    // 程序入口：当被人引入这个库时，是引入那个文件的导出
    // import Element from 'element-ui' 
  "main": "lib/element-ui.common.js",
    //  上传时npm中包含的文件目录
  "files": [
    "lib",
    "src",
    "packages",
    "types"
  ],
//   types 文件入口，
// 很多 javascript 项目并不是使用 typescript 编写，所以类型定义文件可能是作者或者第三方编写的附加产物，安装后同样可以享用 typescript 的 feature。
  "typings": "types/index.d.ts",
//   配置脚本
  "scripts": {
    // a || b，表示如果 a 执行不成功，就执行 b
    "bootstrap": "yarn || npm i",
    // a & b，表示 a 和 b 的命令可以同时执行
    // 通过 node 同时运行 build/bin 下的 iconInit.js、build-entry.js、i18n.js、version.js 这几个文件，它们就是几个普通的 js 文件：
    "build:file": "node build/bin/iconInit.js & node build/bin/build-entry.js & node build/bin/i18n.js & node build/bin/version.js",
    "build:theme": "node build/bin/gen-cssfile && gulp build --gulpfile packages/theme-chalk/gulpfile.js && cp-cli packages/theme-chalk/lib lib/theme-chalk",
    "build:utils": "cross-env BABEL_ENV=utils babel src --out-dir lib --ignore src/index.js",
    "build:umd": "node build/bin/build-locale.js",
    // a && b，表示 a 执行成功后才会执行 b，如果 a 执行失败，b 将不会执行
    "clean": "rimraf lib && rimraf packages/*/lib && rimraf test/**/coverage",
    "deploy:build": "npm run build:file && cross-env NODE_ENV=production webpack --config build/webpack.demo.js && echo element.eleme.io>>examples/element-ui/CNAME",
    "deploy:extension": "cross-env NODE_ENV=production webpack --config build/webpack.extension.js",
    "dev:extension": "rimraf examples/extension/dist && cross-env NODE_ENV=development webpack --watch --config build/webpack.extension.js",
    "dev": "npm run bootstrap && npm run build:file && cross-env NODE_ENV=development webpack-dev-server --config build/webpack.demo.js & node build/bin/template.js",
    "dev:play": "npm run build:file && cross-env NODE_ENV=development PLAY_ENV=true webpack-dev-server --config build/webpack.demo.js",
    "dist": "npm run clean && npm run build:file && npm run lint && webpack --config build/webpack.conf.js && webpack --config build/webpack.common.js && webpack --config build/webpack.component.js && npm run build:utils && npm run build:umd && npm run build:theme",
    "i18n": "node build/bin/i18n.js",
    // *表示任意文件名，**表示任意一层子目录；
    "lint": "eslint src/**/* test/**/* packages/**/* build/**/* --quiet",
    // 执行完 npm run bootstrap 成功后，执行脚本 git-release.sh  ，再执行release.sh    ，最后用 node 执行 gen-indices.js。
    "pub": "npm run bootstrap && sh build/git-release.sh && sh build/release.sh && node build/bin/gen-indices.js",
    // cross-env 对于线上和线下环境可以通过设置不同的环境变量来做区分，设置环境变量 NODE_ENV 为 development，这样在代码中可通过 process.env.NODE_ENV 来获取，比如：

    "test": "npm run lint && npm run build:theme && cross-env CI_ENV=/dev/ BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "test:watch": "npm run build:theme && cross-env BABEL_ENV=test karma start test/unit/karma.conf.js"
  },
  "faas": [
    {
      "domain": "element",
      "public": "temp_web/element"
    },
    {
      "domain": "element-theme",
      "public": "examples/element-ui",
      "build": [
        "yarn",
        "npm run deploy:build"
      ]
    }
  ],
//   库地址
  "repository": {
    "type": "git",
    "url": "git@github.com:ElemeFE/element.git"
  },
//   库主页
  "homepage": "http://element.eleme.io",
//   库关键词
  "keywords": [
    "eleme",
    "vue",
    "components"
  ],
//   库使用协议
  "license": "MIT",
//   bug收集地址
  "bugs": {
    "url": "https://github.com/ElemeFE/element/issues"
  },
  "unpkg": "lib/index.js",
//   样式入口
  "style": "lib/theme-chalk/index.css",
//   生产环境依赖
  "dependencies": {
    // ...
  },
//   兼容依赖
  "peerDependencies": {
    "vue": "^2.5.17"
  },
//   开发环境依赖
  "devDependencies": {
    //   ...
  }
}

```

### 目录结构
1. github：存放了Element UI贡献指南、issue和PR模板
1. build：存放了打包相关的配置文件
1. examples：组件相关示例 demo
1. packages：组件源码
1. src：存放入口文件和一些工具辅助函数
1. test：单元测试相关文件，这也是一个优秀的开源项目必备的
1. types：类型声明文件

### 发布流程
1. 执行测试用例
1. 打包构建
1. 更新版本号
1. npm 包发布
1. 打 tag
1. 自动化部署

### 例子
1. 快速原型开发
基于按需加载element-ui进行二次开发的组件库-下载即用
Monorepo模式+基于模板生成包结构+组件测试ject+vue +storybook展示

https://github.com/Rod-X/rapid-prototyping-elment

```
multirepo-每个包对应一个项目

monorepo-一个项目仓库管理多个模块包

storybook展示
https://storybook.js.org/docs/vue/get-started/introduction
可视化的组件展示平台
在隔离的开发环境中，以交互式的方式展示组件
支持多个框架

yarn workspace
使用根package.json管理公用，组件自身的package.json管理私有的依赖
https://www.yarnpkg.cn/features/workspaces


lerna
优化使用git和npm管理多包仓库的工作流工具
它可以一键把代码提交到git和npm仓库

单测Jest+Vue Test Utils
vue组件单元测试方案。

Rollup
模块打包器
支持tree-shaking
打包结果比webpack小
开发组件库或者框架时Rollup更合适

```
---