### tempale 模板写法
模板写法与vue2大致相同没有变化

### script 变成componet风格 ＋ setup
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