# Props

组件需要显式声明 prop，这样 Vue 才能知道外部传入的哪些是 prop，哪些是透传 attribute (下一章中我们会讨论到它)。

在单文件组件中使用 <script setup> 时，prop 可以使用 defineProps() 宏来定义：

<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>

## Prop 名字格式

如果 prop 的名字很长，应使用 camelCase 形式，因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中使用，避免在作为属性 key 名时必须带引号

defineProps({
  greetingMessage: String
})

<MyComponent greeting-message="hello" />
一般情况下都会使用 PascalCase 作为组件标签名，因为这提高了模板的可读性，能很好地区分出 Vue 组件和原生 HTML 元素。然而这对于传递 prop 来说收效并不高，因此我们选择对其进行转换。

## 传递不同的值类型

在上述的两个例子中，我们只传入了字符串值，但实际上任何类型的值都可以作为一个 prop。

## 更改对象 / 数组类型的 prop

当对象或数组作为 prop 被传入时，虽然子组件无法更改 prop 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，阻止这样的改变不但非常昂贵，也不合理。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响了父组件的状态，可能会使数据流在将来变得更难以推理。按照最佳实践来讲，你应该避免这样的更改，除非父子组件在设计上耦合得非常紧密。在大多数的用例场景中，子组件都应该抛出一个事件来通知父组件做出改变。