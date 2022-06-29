# TypeScript 项目实践：四步走高效改造现有的 JavaScript 项目

## 第一条，定义 type 尽量不使用 any
我们都知道，在代码中大量的使用 any 其实可以明显地降低移植难度，但是我们引入 TypeScript 的初衷是为了给代码进行类型约束，那么使用了 any 之后就失去了这种类型约束的作用，所以我们这里把 eslink 中，这一条 no-explicit-any 设置成了 warn，我们并不会完全去禁止使用 any，但是不建议。
## 第二条，推荐使用 keyof 对 object 中的 key 进行约束。


## 第三条，推荐用 tuple 来代替 array 来约束数组长度。


## 最后一条，id 尽量不要模糊定义它的类型（string | number），推荐把 id 明确定义为 string 或者 number