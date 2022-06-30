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