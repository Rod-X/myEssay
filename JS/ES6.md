# ES6语法

## let&count

## 数组解构赋值

## 对象的解构

## 剩余参数收集RECT
## 展开运算发 ...

## 模板字符串
+ 模板字符串函数
```javascript
  function tagFunc(stringsList,arg1,arg2){
    
  }
  const result = tagFunc`1${arg1}2${args2}`
```

## 字符串的扩展方法
+ string.startsWith('')
+ endsWith('')
+ includes('')

## 函数设置默认值
+ 带有默认值的参数必须放在最后

## 箭头函数
+ 方便
+ 不能改变this指向,this在定义时上下文
+ 使用箭头函数避免_this的使用

## 对象字面量的增强
+ {a:'a'}=> a="a"  {a}
+ 计算属性名 {[1+2]:3}=>{3:3}

## 合并对象Object.assign(target,source1)
+ 用后面参数的对象属性,覆盖目标对象的属性

## 对象扩展方法
+ Object.is(+0,-0)//false
+ Object.is(NaN,NaN)//true

## 对象代理器Proxy
```javascript
const obj = {
  name:'name',
  age:20
}
const proxyObj= new Proxy(obj,{
  get(target,property){},
  set(target,property){},
})
```

## proxy与Object,definedPropety对比
+ proxy可以监控更多的操作 例如删除delete
+ 对于数组对象的监视
  - definedPropery劫持数组原生方法
+ proxy是以非侵入的方式监视
  - defineProperty需要对对象每个属性都得进行监视操作

## Reflect是一个新的内置对象-只提供静态对象 13个方法
+ Reflect是proxy内部处理方法的默认实现
  - const proxy = new Proxy(obj,Reflect)
+ 统一了统⼀的对象操作 API

## Promise 内置对象 异步编程解决方法

## class类 声明一个类
+ construtor() 初始和对象属性
+ 直接放置函数,生成实例方法,会自动定义到函数对象的原型上.实例调用
+ static 静态方法,定义到函数对象上对象调用

## 类的继承extends
+ super()继承属性
+ super.say()可以使用super使用父类方法

## Set集合
+ 不重复的类数组
+ size
+ add
+ has
+ delete
+ clear
## weakSet集合
## Map字典
+ 类似对象
+ size
+ set
+ has
+ delete
+ clear
## weakMap字典
+ 只能使用对象作为键

## Symbol 唯一值
+ 作为属性名时,不能用常规循环,需要用getOwnPropertySymbol

## BigInt

## for...of循环
+ 遍历所有数据的统一方式
+ 不能直接遍历对象,可以直接遍历数组(因为没有实现Symbol.iterator)
+ 伪数组遍历
+ 遍历Map对象
+ iterable,会内部调用这个Symbol.iterator(@@iterator)

## iterator
+ 函数,返回一个next函数
+ next函数返回一个对象
+ 对象里面有两个属性value和done
+ 让外部不用关心数据如何.可以直接使用这些数据

## Generator函数-执行后返回一个生成器对象
+ 配合yield一块使用
+ foo()生一个一个生成器对象.
+ 调用这个生成器对象的next方法才会执行
+ 每次调用都会在下一个yield暂停
+ next传入的值会传递给yield的那里

## ESMoudle

以上为ES2015
---
下面为es2016
## includes

## 指数运算符
+ math.pow(2,10)
+ 2**10

## ES2017
## Object.entries()
## Object.keysof()
## Object.values()
## 使用尾逗号
## Async/Await