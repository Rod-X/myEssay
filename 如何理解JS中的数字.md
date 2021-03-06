### 关于js中的数字



##### 1.js的数字均是双精度浮点类型

双精度浮点类型又称IEEE754类型

js的浮点数运算是不精确的，不止js，JAVA/Python中做的浮点数运算也不精确

前端中最显著的例子就是：0.1+0.2===0.3 //false



##### 2.v8引擎是怎么存储数字的

v8会将数字区分位两种格式，Smis(小整数)，以及其他

**V8 使用最低有效位将所有值标记为 Smis 或堆指针**

| 类型         | 存储方式      | 范围                                             |
| ------------ | ------------- | ------------------------------------------------ |
| Smis(小整数) | stack栈空间中 | [-2³¹，2³¹-1] (64位平台)   [-2³⁰,2³⁰] (32位平台) |
| 其他         | heap堆空间中  |                                                  |



##### 3.数字在内存中的表示


![数字的内存表示.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ae05c72a24445c59ee26e3c849ac458~tplv-k3u1fbpfcp-watermark.image?)



双精度浮点数在内存中64bit，可分为3部分

第一部分 sign 符号，占1bit,正数为0,负数为1

第二部分 exponent 指数e，占用11位，指数的值为e1023指数

第三部分 fraction 尾数，占52位，表示小数(即有效数字部分-整数跟浮点数)


##### 安全有效整数值范围仅在±(2^53  - 1)的范围内可以表示准确。
- 为什么?
- 首先安全有效整数，是得是一个连续不间断的整数。而指数形式，是间断的
- 而52位有效数字部分，能表示0-(2^53-1)个数字，再加上第一部分的符文位
- 最后，构成±(2^53-1)

#### 为什么  0.1+0.2 =0.30000000...
- 首先所有数字运算会转换位，二进制运算，即 64位双精度表示
- 小数0.1和0.2如何展示？(使用乘2取整，顺序排列方法)
- 0.0001 1001 1001 1001 1001 1001 1001 ...(0.1--二进制无限循环了)
- 0.0011 0011 0011 0011 0011 0011 0011 ...(0.2--二进制无限循环了)
- 然而，无限循环但是存储只有52位，导致，52位以后的舍去，得出非正确结果
- 其中整数0会被默认加上，不占存储位


##### 4.遇到过大的整数
虽然出来新的数据类型BigInt，但是多用的还是一些开源库
如：bigjs