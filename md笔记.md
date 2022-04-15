# 主要记录用于书写掘金中的md技巧+typora快捷键

> 可以先使用快捷键生成代码块--然后在代码块中插入文字
>
> 

## 字体格式

> 样式

*斜体*

**粗体**

***斜体加粗***

~~删除线~~

<u>下划线</u>

这是一个[链接](https://juejin.cn/user/1196687670914888)

> 代码 + 快捷键
>

```
*斜体*  (斜体体快捷键-Ctrl+I)
**粗体**  (粗体快捷键-Ctrl+B)
***斜体加粗*** (综合使用上面两个)
~~删除线~~ (粗体快捷键-Alt+Shift+5)
<u>下划线</u> (粗体快捷键-Ctrl+U)
这是一个[链接](https://juejin.cn/user/1196687670914888)  (粗体快捷键-Ctrl+K)
```

## 标题

> 样式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5fad49367d9482190c89880e6f122e4~tplv-k3u1fbpfcp-watermark.image?)

> 代码 + 快捷键

```
# 1级标题 (斜体体快捷键-Ctrl+1)
#个数代表几级标题 ---快捷键直接使用Ctrl+数字生成几级标题
```

## 表格

> 样式

| 标题   | 标题   |
| ---- | ---- |
| 内容   | 内容   |

> 代码

```
| 标题      | 标题 |
| ----------- | ----------- |
| 内容      | 内容       |
快捷键 Ctrl+T
```

## 列表

> 样式

* 无序列表
  * 子无序（回车键+Tab键）
* 无序列表
* 无序列表
* 无序列表

1. 有序列表
   1. 子有序
2. 有序列表
3. 有序列表
4. 有序列表

- [x] 任务列表
- [ ] 任务列表



```
* 无序列表
  * 子无序（回车键+Tab键）
* 无序列表
* 无序列表
* 无序列表
---- 星号(*)、加号(+)或是减号(-)后面加上空格
1. 有序列表
   1. 子有序
2. 有序列表
3. 有序列表
4. 有序列表
---- 1.后面加上空格--剩下的回车键自动生成

- [x] 任务列表
- [ ] 任务列表
两个连续回车键会取消列表格式



----快捷键（优先使用代码，系统因素不一定能使用）
有序列表：Ctrl+Shift+[
无序列表：Ctrl+Shift+]
```

## 引用

> 样式

> 引用
>
> > 二级应用
> >
> > * 加列表
> > * 加列表
> >
> > #### 加4级标题
> >
> > 引用内部还可以使用其他md语法
> >
> > 这是一个[链接](https://juejin.cn/user/1196687670914888)

> 代码

```
> 引用
>
> > 二级应用
> >
> > + 加列表
> > + 加列表
> >
> > #### 加4级标题
> >
> > 引用内部还可以使用其他md语法
> >
> > 这是一个[链接](https://juejin.cn/user/1196687670914888)

使用>号加空格 表示引用
快捷键 Ctrl+Shift+Q
```

## 图片

> 样式

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e5fb59b1a5b43108a9def93522a0e73~tplv-k3u1fbpfcp-watermark.image)



> 代码

```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e5fb59b1a5b43108a9def93522a0e73~tplv-k3u1fbpfcp-watermark.image?)
![]()---快捷键：Ctrl+Shift+I
```

## 代码块

> 样式

```js
代码块
```

这个代码是`code`

> 代码

```
​```js
代码块
​```
这个代码是`code`
快捷键：Ctrl+Shift+k
```

## 分割线

> 样式

---

> 代码

```
---
```



## 掘金解析html技巧

### 自定义背景

> 样式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92889bb1e7044b05b589eb248ff490ee~tplv-k3u1fbpfcp-watermark.image?)

> 代码

```
<div style='background: -webkit-linear-gradient(top, transparent 19px, #ececec 20px), -webkit-linear-gradient(left, transparent 19px, #ececec 20px);background-size: 20px 20px;'>
 内容
</div>
```



### 自定义标题样式

> 样式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dcb642014cf453d97687b4fc497ca44~tplv-k3u1fbpfcp-watermark.image?)

> 代码

```
<h2 style='color: inherit; line-height: inherit; padding: 0px; margin: 1.6em 0px; font-weight: bold; border-bottom: 2px solid rgb(127, 127, 127); font-size: 1.3em;'><span style='font-size: inherit; line-height: inherit; margin: 0px; display: inline-block; font-weight: normal; background: rgb(127, 127, 127); color: rgb(255, 255, 255); padding: 3px 10px 1px; border-top-right-radius: 3px; border-top-left-radius: 3px; margin-right: 3px;'>总结</span></h2>
```



### 自定义图片样式

> 样式

<img style='width: auto;
​    max-width: 100%;
​    border-radius: 12px;
​    display: block;
​    margin: 20px auto;
​    object-fit: contain;
​    box-shadow: 2px 4px 7px #999;' src='https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e5fb59b1a5b43108a9def93522a0e73~tplv-k3u1fbpfcp-watermark.image?'>



> 代码

```
https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e5fb59b1a5b43108a9def93522a0e73~tplv-k3u1fbpfcp-watermark.image?
在image标签中src属性改为掘金链接
```



## 符号转义

> 要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符 \ 。

```
以下字符均需要通过转义才能正常显示
\ ` * _ {} [] () # + - · ! |
```



## 可内嵌HTML标签

> 一些文本标签，或者区块标签（p标签一遍不用）

```
文本：<span>、<cite>、<del>、<a>、<img>
区块：<div>、<table>、<pre>、<p>必须在前后加上空行，以便于内容区分
```

