# flex 布局的基本概念
Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。本文给出了 flexbox 的主要特性，更多的细节将在别的文档中探索。

当使用 flex 布局时，首先想到的是两根轴线 — 主轴和交叉轴
主轴
主轴由 flex-direction 定义，可以取 4 个值：
row
row-reverse
column
column-reverse

Flex 简写形式允许你把三个数值按这个顺序书写 — flex-grow，flex-shrink，flex-basis
Flex 元素属性：flex-basis 
 flex-basis 定义了该元素的空间大小（the size of that item in terms of the space），flex 容器里除了元素所占的空间以外的富余空间就是可用空间 available space。 该属性的默认值是 auto 。此时，浏览器会检测这个元素是否具有确定的尺寸。 在上面的例子中，所有元素都设定了宽度（width）为 100px，所以 flex-basis 的值为 100px。

如果没有给元素设定尺寸，flex-basis 的值采用元素内容的尺寸。这就解释了：我们给只要给 Flex 元素的父元素声明 display: flex ，所有子元素就会排成一行，且自动分配小大以充分展示元素的内容。

Flex 元素属性：flex-grow
flex-grow 若被赋值为一个正整数， flex 元素会以 flex-basis 为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的可用空间（available space）。如果有其他元素也被允许延展，那么他们会各自占据可用空间的一部分。

如果我们给上例中的所有元素设定 flex-grow 值为 1，容器中的可用空间会被这些元素平分。它们会延展以填满容器主轴方向上的空间。

flex-grow 属性可以按比例分配空间。如果第一个元素 flex-grow 值为 2，其他元素值为 1，则第一个元素将占有 2/4（上例中，即为 200px 中的 100px）, 另外两个元素各占有1/4（各50px）。

Flex 元素属性： flex-shrink
flex-grow属性是处理 flex 元素在主轴上增加空间的问题，相反flex-shrink属性是处理 flex 元素收缩的问题。如果我们的容器中没有足够排列 flex 元素的空间，那么可以把 flex 元素flex-shrink属性设置为正整数来缩小它所占空间到flex-basis以下。与flex-grow属性一样，可以赋予不同的值来控制 flex 元素收缩的程度 —— 给flex-shrink属性赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。

在计算 flex 元素收缩的大小时，它的最小尺寸也会被考虑进去，就是说实际上 flex-shrink 属性可能会和 flex-grow 属性表现的不一致。因此，我们可以在文章《控制 Flex 子元素在主轴上的比例》中更详细地看一下这个算法的原理。

你在教程中常看到的 flex: 1 或者 flex: 2 等等。它相当于flex: 1 1 0。元素可以在flex-basis为 0 的基础上伸缩。

justify-content属性的值：

stretch
flex-start
flex-end
center
space-around
space-between