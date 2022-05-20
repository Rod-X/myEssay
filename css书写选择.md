## css Modules
再组件库或者全局中
CSS Modules 对于 Vue 组件是一个不错的选择
```vue
<template>
  <button :class="{
    'global-button-class-name': true,
    [styles.button]: true,
    [styles.mini]: mini
  }">点我</button>
</template>
 
<script>
  import styles from './button.css'
 
  export default {
    props: { mini: Boolean },
    data: () => ({ styles })
  }
</script>
```
+ 你必须在 data 中传入 styles
+ 你必须使用 styles.localClassName 导入全局类名
+ 如果有其他全局类名，你必须将它们放在一起
+ 如果要和组件的属性值绑定，就算局部类名和属性名一样，也要显式指定



写法二

```vue
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    点我
  </button>
</template>
 
<script>
  import CSSModules from 'vue-css-modules'
  import styles from './button.css'
 
  export default {
    mixins: [CSSModules(styles)],
    props: { mini: Boolean }
  }
</script>
```
实现原理

vue-css-modules 注册了 beforeCreate 钩子，在钩子中劫持了组件的渲染函数。对于传给渲染函数的参数，将会解析其 data 或 data.attrs 中的 styleName 属性生成全局类名字符串，并将它附着在 data.staticClass 值的后面。

## scope
在单文件组件中
1. 我们在组件加了 scoped 之后，组件的根元素的样式会自动添加一个hash值。 
原理就是给组件的每个标签追加 data-v-hash 属性，选择器也变为属性选择器

1. 在父组件中，最多只能影响子组件的根元素，意思就是在父组件的样式中只能修改子组件根元素的样式
子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。
这是有意为之的，这样父组件就可以设置子组件根节点的样式，以达到调整布局的目的。
官方给出 inheritAttrs 属性，如果为 false ，则非 props 属性不会应用到子组件的根元素上



1. 在父组件中，最多只能影响子组件的根元素，而不能修改子组件根元素更里层的样式
1. 默认只能在父组件修改子组件根元素的样式，如果想修改子组件更深层元素的组件的样式，就给子组件样式加/deep/(浏览器兼容性最好)
>>>、/deep/以及::v-deep
以上三种的效果均是在父组件改变子组件更深层元素的样式

