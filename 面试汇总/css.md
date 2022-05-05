### 第 1 题：介绍下 BFC 及其应用

#### 是什么：

BFC全称：Block Formatting Context ，中文块级格式化上下文

官方解释：BFC决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用，当设计到可视化布局时，BFC提供了一个环境，HTMl在这个环境中按一定规则进行布局

简单说：BFC提供了一个完全独立的布局环境，让空间内的子元素不会影响到外面的布局。也就是可以看做css属性吧

#### 怎么触发：

```css
overflow:hidden;
display:inline-block;
position:absolute;
display:table-cell;
display:flex
```

常用有flex布局，行内块布局，绝对定位

#### 特性：

+ BFC是一个块级元素。块级元素会在垂直方向一个接一个排列
+ BFC是页面中一个隔离独立的容器，容器里面的标签不受外部标签影响
+ 垂直方向的距离由margin决定，属于同一个BFC的两个相邻的标签外边距会发生重叠
+ 计算BFC高度时，浮动元素也参与计算

#### 解决了什么

1. 使用Float脱离文档流，父元素高度塌陷。（上面最后一条）
2. margin时上下边距重叠
3. 两栏布局

#### 两栏布局

左边div float：left；右边div固定时，但是被第一个div元素设置的float脱离文档流给覆盖上去，解决办法就是给第二个div设置一个bfc



### 第 2 题：怎么让一个 div 水平垂直居中



#### postion方法

设置父元素相对定位，居中元素绝对定位，`top,right,bottom,left `的值都设置为0，如果具体宽高的话，居中元素会在水平和垂直方向铺满父元素。如果再给他设置具体宽高时，再配合`margin：auto`就能实现绝对居中。



#### position方法配置transform

left:50%;top:50%;tansform:traslate(-50%,-50%)

#### 已知高度下，可以使用position＋margin（需要自己计算）

#### flex

```css
display:flex;
align-items:center;
justify-content:center;
```

还有一些其他的方法比如使用父容器使用flex，grid，table 这两个楼上也提到了，是可以实现的，但是在实际应用中， 因为改变了父容器的display，在多个子节点反而不好用了

### 第 3 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

#### display：none

1.DOM结构：浏览器不会渲染display属性为none的元素，不占据空间；

2.事件监听：无法进行DOM事件监听；不能点击

3.性能：动态改变此属性是会引起重排，性能较差

4.继承：不会被子元素继承，不过子元素也不会被渲染

5.transition不支持display，就是消失重新的动画不支持这个属性



#### visibility：hidden

1.DOM结构：元素被隐藏，但是会被渲染，不会消失，占据空间

2.事件监听：无法进行DOM事件监听；不能点击

3.性能：动态改变此属性会引起重绘，性能较好

4.继承：会被子元素继承，子元素可以通过设置visibility：visible；来取消隐藏

5.transition：transition支持visibility



#### opacity:0

1.DOM结构：透明度为100%，元素隐藏，占据空间；

2.事件监听：可以进行DOM事件监听：可以被点击

3.性能：提升到合成层，不会触发重绘，性能较好；

4.继承：会被子元素继承，且，子元素并不能通过opacity：1来取消隐藏

5.transition:trasiton支持opacity

### 第 4 题：如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性

#### css实现

```css
单行： 
overflow: hidden; 
text-overflow:ellipsis; 
white-space: nowrap; 
多行： 
display: -webkit-box; 
-webkit-box-orient: vertical; 
-webkit-line-clamp: 3; //行数 
overflow: hidden;

```

#### js实现

```javascript
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}
```

#### Eltable 中 textLimit限制超过长度的文本提示框

```vue
<template>
  <el-tooltip
    v-bind="$attrs"
    placement="top"
    effect="light"
    :disabled="isDisabled"
  >
    <template slot="content">
      <div class="textLimitTips">
        <slot name="content">
          <span>{{ $attrs.content }}</span>
        </slot>
      </div>
    </template>
    <div class="wrapper" :style="style" @mouseenter="popShow">
      <span class="wrap" ref="wrap">
        <slot></slot>
      </span>
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  inheritAttrs: false,
  name: 'textLimit',
})
export default class TextLimit extends Vue {
  @Prop({
    type: Number,
    default: 2,
  })
  limit?: number

  private isDisabled = true

  get style() {
    const { limit } = this
    return {
      '-webkit-line-clamp': limit,
    }
  }

  // methods
  popShow(ev) {
    const parent = ev.target
    const parentH = parent.offsetHeight
    const { wrap } = this.$refs as any
    const childH = wrap.offsetHeight
    if (childH > parentH) {
      this.isDisabled = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.textLimitTips {
  overflow-y: auto;
  max-width: 560px;
  max-height: 320px;
  padding: 1px;
  word-break: break-all;
}
</style>

```

