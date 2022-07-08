## 定义prop 
```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

通过泛型参数来定义 prop 的类型通常更直接
```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
我们也可以将 prop 的类型移入一个单独的接口中：
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>

```

接口或对象字面类型可以包含从其他文件导入的类型引用，但是，传递给 defineProps 的泛型参数本身不能是一个导入的类型：
```vue
import { Props } from './other-file'

// 不支持！
defineProps<Props>()

```

## props与watch
```vue
const props = defindProps<{msg:string]}>()
watch(
    ()=>props.msg,
    ()=>{
        consoloe.log('监听props.msg变化')
    }
)
```
## props与compute
```vue
const props = defineProps(['size'])

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

## props与ref
```vue
const props = defineProps(['initialCounter'])

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)
```