# 模板 ref 
为了通过组合式 API 获得该模板 ref，我们需要声明一个同名的 ref：
```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

当 ref 在 v-for 中使用时，相应的 ref 中包含的值是一个数组，它将在元素被挂载后填充：

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

## 函数型 ref

除了使用字符串值作名字，ref attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。函数接受该元素引用作为第一个参数：

<input :ref="(el) => { /* 将 el 分配给 property 或 ref */ }">

如果你正在使用一个动态的 :ref 绑定，我们也可以传一个函数。当元素卸载时，这个 el 参数会是 null。你当然也可以使用一个方法而不是内联函数。

## 组件上的 ref
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>

如果一个子组件使用的是选项式 API 或没有使用 <script setup>，
被引用的组件实例和该子组件的 this 完全一致，
这意味着父组件对子组件的每一个属性和方法都有完全的访问权。


有一个例外的情况，使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：

<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>

当父组件通过模板 ref 获取到了该组件的实例时，得到的实例类型为 { a: number, b: number } (ref 都会自动解包，和一般的实例一样)。