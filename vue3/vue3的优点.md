# vue3 的优点
## 一、性能比2.x快1.2～2倍
在vue3中，增加了静态标记PatchFlag。在创建vnode的时候，会根据vnode的内容是否可以变化，为其添加静态标记PatchFlag。diff的时候，只会比较有PatchFlag的节点。PatchFlag是有类型的，比如一个可变化文本节点，会将其添加PatchFlag枚举值为TEXT的静态标记。这样在diff的时候，只需比对文本内容。需要比对的内容更少了。PatchFlag还有动态class、动态style、动态属性、动态key属性等枚举值。

render阶段的静态提升（render阶段指生成虚拟dom树的阶段）

在vue2中，一旦检查到数据变化，就会re-render组件，所有的vnode都会重新创建一遍，形成新的vdom树。

在vue3中，对于不参与更新的vnode，会做静态提升，只会被创建一次，在re-render时直接复用。

静态提升可以理解为第一次render不参与更新的vnode节点的时候，保存它们的引用。re-render新vdom树时，直接拿它们的引用过来即可，无需重新创建。

事件侦听缓存

在vue2中，我们写的@click="onClick"也是被当作动态属性，diff的时候也要对比。但我们知道它不会变化，比如变成@click="onClick2"，绑定别的值。

在vue3中，如果事件是不会变化的，会将onClick缓存起来（跟静态提升达到的效果类似），该节点也不会被标记上PatchFlag（也就是无需更新的节点）。这样在render和diff两个阶段，事件侦听属性都节约了不必要的性能消耗。

我曾经维护过一个拥有很庞大dom树的页面。由于节点非常多，无需参与更新的节点也很多，使用vue2的情况下，在render和diff两个阶段，消费了很多性能，如果当时有vue3的话，我想性能会被优化很多。

减少创建组件实例的开销

vue2.x每创建一个实例，在this上要暴露data、props、computed这些，都是靠Object.defineProperty去定义的。这部分操作还是挺费时的。

vue3.0中基于Proxy，减少了创建组件实例的性能开销。

## 二、按需编译，体积比Vue2.x更小（Tree shaking）
在vue3中，可以如下面这样引用vue的功能函数，如果你的项目没有用到watch，那编译时就会把tree shaking掉。

import { computed, watch, nextTick } from "vue";

利用的就是 ES6 模块系统import/export。

## 三、Compostion API: 组合API/注入API


## 四、更好的TS支持

## 五、自定义渲染API（Custom Renderer API）

## 六、更先进的组件
Fragment组件

// vue2是不允许这样写的，组件必须有一个跟节点，现在可以这样写，vue将为我们创建一个虚拟的Fragment节点。

<template>

<div>Hello</div>

<div>World</div>

</template>

这样写有何好处呢？一是如果根节点不是必要的，无需创建了，减少了节点数。二是Fragment节点是虚拟的，不会DOM树中呈现。

Suspense组件

<Suspense>

<template >

<Suspended-component />

</template>

<template #fallback>

Loading...

</template>

</Suspense>

在Suspended-component完全渲染之前，备用内容会被显示出来。如果是异步组件，Suspense可以等待组件被下载，或者在设置函数中执行一些异步操作。

## 七、更快的开发体验（vite开发构建工具）
在使用webpack作为开发构建工具时，npm run dev都要等一会，项目越大等的时间越长。热重载页有几秒的延迟，但是如果用vite来做vue3的开发构建工具，npm run dev 秒开，热重载也很快。这种开发体验真是很爽，拒绝等待。

vite的原理还是用了浏览器支持import关键字了，启动项目不用webpack构建工具先构建了，浏览器直接请求路由对应的代码文件，代理服务器针对单个文件进行编译并返回。如果请求的文件里还import了其他文件，同理浏览器继续发请求，代理服务器返回。就这样实现了npm run dev时无需编译，实时请求实时编译。



