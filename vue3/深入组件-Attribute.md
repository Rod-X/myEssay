# 穿透Attribute
“透传 attribute”是传递给组件的 attribute 或者 v-on 事件监听器，但并没有显式地声明在所接收组件的 props 或 emits 上。最常见的例子就是 class、style 和 id。

## 对 class 和 style 的合并

如果一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上继承的值合并。将之前的 <MyButton> 组件的模板改成这样：

## v-on 监听器继承

同样的规则也适用于 v-on 事件监听器：

<MyButton @click="onClick" />

监听器 click 会被添加到 <MyButton> 的根元素，即那个原生的 <button> 元素之上。当原生的 <button> 被点击，会触发父组件的 onClick 方法。如果原生 button 元素已经通过 v-on 绑定了一个事件监听器，则这些监听器都会被触发。

## 深层组件继承

如果一个组件在根节点上渲染另一个组件，例如，我们重构一下 <MyButton>，让它在根节点上渲染 <BaseButton>：

<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
<BaseButton />

此时 <MyButton> 接收的透传 attribute 会直接传向 <BaseButton>。

请注意：

    透传的 attribute 不会包含 <MyButton> 上声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数，换句话说，声明过的 props 和侦听函数被 <MyButton>“消费”了。

    透传的 attribute 若符合声明，也可以作为 props 传入 <BaseButton>。


## 禁用 Attribute 继承

如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 inheritAttrs: false。

如果你使用了 <script setup>，你需要一个额外的 <script> 块来书写这个选项声明：

<script>
// 使用一个简单的 <script> to declare options
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>

最常见的需要禁用 attribute 继承的场景就是 attribute 需要应用在根节点以外的其他元素上。通过设置 inheritAttrs 选项为 false，你可以完全控制透传进来的 attribute 如何应用。

## 单根节点自动 attribute 透传行为

## $attrs 对象
$attrs 对象包含了除组件的 props 和 emits 属性外的所有其他 attribute，例如 class，style，v-on 监听器等等。

有几点需要注意：

    和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问。

    像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick。


## $attrs 对象集成
现在我们要再次使用一下之前小节中的 <MyButton> 组件例子。有时候我们可能为了样式，需要在 <button> 元素外包装一层 <div>：

<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>

我们想要所有像 class 和 v-on 监听器这样的透传 attribute 都应用在内部的 <button> 上而不是外层的 <div> 上。我们可以通过设定 inheritAttrs: false 和使用 v-bind="$attrs" 来实现：

<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>

请记住没有参数的 v-bind 会将一个对象的所有属性都作为 attribute 应用到目标元素上。

## 在 JavaScript 中访问透传 Attribute

如果需要，你可以在 <script setup> 中使用 useAttrs() API 来访问一个组件的所有透传 attribute：

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

如果没有使用 <script setup>，attrs 会作为 setup() 上下文对象的一个属性暴露：

export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}

需要注意的是，虽然这里的 attrs 对象总是反映为最新的透传 attribute，但它并不是响应式的 
(考虑到性能因素)。
你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。
或者你也可以使用 onUpdated() 使得在每次更新时结合最新的 attrs 执行副作用。