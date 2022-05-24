# Typescript
+ js的超集,强类型语言
  - 弱类型;不会限制实参类型;允许任意的隐式类型转换
  - 强类型;会;不允许任意隐式类型转换
+ 静态类型的
  - 静态语言:声明时,变量类型就是明确的
  - 动态语言:声明式不确定,赋值时确定,可以随意改变
- folw也是一直静态类型检查方案
+ 重构更方便
+ 减少不必要的类型判断

## tsconfig
+ taget:转换为es5
+ module:commonjs
+ outDir:''输出地址
+ root:'输入地址'
+ strict:true 严格模式

## 原始类型
+ string
+ number
+ boolean
+ void:返回undifind
+ undefined
+ null
+ symbol

## Object类型
+ 泛指非原始类型

## 数组类型
+ Array<number> 数组泛型
+ number[]

## 元组类型
+ 明确元素数量与类型
+ [number,string] = [18,'18']

## 枚举类型
+ 明确需要的值
+ enum E{
  Defaul=0,
  Defaul1:1,
}
+ 如果时enum E{
  a=1,
  b,
  c
} //bc会自增长
+ const enum常量枚举,编译后只保存值

## 函数的类型
+ 函数声明 function fn(a:number):void{}
+ 函数表达式 const fn = function(a:number):viod{}
+ 函数表达式 const fn:(a:number)=>string = function(a){} // 接口形式定义

## 任意类型
+ any 不会进行类型检查

## 隐式类型推断
+ 初次赋值的时候会隐式添加类型推断

## 类型断言
+ 使用 as 关键词 res as number
+ <number>res //不能在jsx中使用

## 接口 interface
+ 约定对象的结构
+ interface Most{
  title:string
  content:string
  subtitle?:string 可选成员
  readonly summary:string 只读成员
}//只是做约定,实际编译上会去除
+ 动态键名
```javascript
interface Cache{
  [prop:string]:string
}
const cache: Cache= {}
cache.bar = '1'
cache.foo = '1'

```

## 类
+ 描述一项事物的抽象
+ 访问修饰符
  - private 只能在类的内部访问
  - pubilc 默认
  - protected 保护修饰符

## 类与接口
```ts
interface Eat{
  eat(food:sring):viod
}
interface Run{
  run(food:string):viod
}
class Person implements Eat,Run{
  eat(){}
  run(){}
}
class Animal implements Eat,Run{
  eat(){}
  run(){}
}
```

## 抽象类
+ 大类建议使用抽象类 abstract
+ 只能被继承

## 泛型
+ 一开始没有具体类型,等调用的时候再传入类型,进行约束
+ 
```ts       这里声明泛型           这里传入泛型的类型
function getArr <T>(len:number,value:T):T[}{
  return arr
}
```

## 类型声明 type
+ 类型别名,把类型规定为自己命名的类型
+ 可以声明基本类型
+ 一般都使用type进行类型声明
+ @type/模块名
+ 可以使用 in keyof

## type和interface区别
+ 定义基本类型使用type
+ 定义元组类型使用type
+ 定函数类型使用type
+ 定义联合类型使用type
+ 定义影射类型使用type

- 需利用接口自动合并特性时候,使用interface
- 定义对象类型且无需使用 type 时候,使用interface


## type和interface可以相互继承
```ts
type Point={
  x:number
}
type Set={
  y:number
}
interface PointA{
  z:number;
}
interface SetB{
  o:number
}

interface B extent Point{}
type BB  = PointA &{
  homrny:number
}
```