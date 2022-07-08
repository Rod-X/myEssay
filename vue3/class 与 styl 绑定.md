## 如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs property 来实现指定：
```vue
<!-- my-component 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>


<my-component class="baz"></my-component>

我们可以给 :class (v-bind:class 的缩写) 传递一个对象来动态切换 class：
<div :class="{ active: isActive }"></div>

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

```
