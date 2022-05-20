### tempale 模板写法
模板写法与vue2大致相同没有变化

### script 变成componet风格 ＋ setup
reactive() 的局限性#
reactive() API 有两条限制：

1. 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。
1. 因为 Vue 的响应式系统是通过 property 访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：


ref() 定义响应式变量#
1. 为了解决 reactive() 带来的限制，Vue 也提供了一个 ref() 方法来允许我们创建可以使用任何值类型的响应式 ref：
1. ref() 从参数中获取到值，将其包装为一个带 .value property 的 ref 对象：
1. 请注意，仅当 ref 是模板渲染上下文的顶层 property 时才适用自动“解包”。 例如， foo 是顶层 property，但 object.foo 不是。



```vue
<!-- setup 模式可以直接使用响应式变量，方法，计算属性不需要提供选项 -->
<script lang="ts" setup>
import { computed, ref } from "vue";
interface todo {
  done: boolean,
  name: string
}
// ref 对与简单数据会直接使用ref，对于复杂数据会内部调用reative，，读写时需要加个value--todos.value
let val = ref('')
let todos = ref<todo[]>([])
// 对于方法 直接使用函数声明式 （或者式函数的表达式）
function addTodo() {
  if (val.value) {
    todos.value.push({
      done: false,
      name: val.value
    })
    val.value = ''
  }
}
let addTodo=function() {
  if (val.value) {
    todos.value.push({
      done: false,
      name: val.value
    })
    val.value = ''
  }
}
// 对于计算属性 有下面两种写法，由于式响应式的,对写也需要加上value
let len = computed<number>(() => todos.value.length)
let selNum = computed<number>(() => todos.value.filter(v => v.done).length)
let isAll = computed<boolean>({
  get() {
    return len.value === 0 ? false : len.value == selNum.value
  },
  set(val: boolean) {
    todos.value.forEach(v => { v.done = val })
  }
})
</script>
```

### mout() mainjs变化
```javascript
import { createApp } from 'vue'
import App from './App.vue'
// 冲new vue 变为createApp
createApp(App).mount('#app')

```

### 计算属性缓存 vs 方法
相比之下，方法调用总是会在重渲染发生时再次执行函数。

为什么需要缓存呢？想象一下我们有一个非常耗性能的计算属性 list，需要循环一个巨大的数组并做许多计算逻辑，并且可能也有其他计算属性依赖于 list。没有缓存的话，我们会重复执行非常多次 list 的计算函数，然而这实际上没有必要！如果你确定不需要缓存，那么也可以使用方法调用。

从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

### Class 与 Style 绑定
```vue
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 和组件配合 -->
<!-- 在使用组件时 -->
<my-component class="baz boo"></my-component>
<!-- 渲染出的 HTML 为： -->
<p class="foo bar baz boo">Hi</p>
```

### 列表渲染 v-if和v-for
```vue
<!-- 渲染数组 -->
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
<!-- 渲染对象 -->
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>


<!-- 当它们同时存在于一个节点上时，v-if 比 v-for 的优先级更高。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名： -->
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
<!-- 在外新包装一层 <template> 再在其上使用 v-for 可以解决这个问题 (这也更加明显易读)： -->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>

<!-- 通过 key 管理状态 -->
<!-- Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。 -->

```

### 监听事件
事件处理器的值可以是：

1. 内联事件处理器：事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。

2. 方法事件处理器：一个组件的属性名、或对某个方法的访问。
```vue
<!-- 内联事件处理器 -->
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>

<!-- 方法事件处理器 -->
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
<button @click="say('bye')">Say bye</button>
<!-- 有时我们需要在内联事件处理器中访问原生 DOM 事件。你可以向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数： -->
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
<script>
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
</script>
```
### 事件修饰符
+ .stop
+ .prevent
+ .self
+ .capture
+ .once
+ .passive
```vue
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
<!-- 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为。 -->

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>

```

### 按键修饰符
.enter
.tab
.delete (捕获“Delete”和“Backspace”两个按键)
.esc
.space
.up
.down
.left
.right

### 按键修饰符
```vue
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```

### 表单输入绑定
```vue
<!-- v-model 会忽略任何表单元素上初始的 value、checked 或 selected attribute。它将始终将当前绑定的 JavaScript 状态视为数据的正确来源。你应该在 JavaScript 中声明该初始值，使用响应式系统的 API。 -->

```
