// 寄生组合式继承
// 1.通过call调用父类函数的方式，获得属性
// 2.通过空函数f（）{} 将其的prototype指向父类的prototype，实例化后赋值给子类的prototype，获取父类方法
// 3.把子类的prototype。contructor属性指向子类函数
// 4.最后定义子类prototype上的私有方法

  // 实现继承的核心函数
  function inheritPrototype(subType,superType) {
    function F() {};
    //F()的原型指向的是superType
    F.prototype = superType.prototype; 
    //subType的原型指向的是F()
    subType.prototype = new F(); 
    // 重新将构造函数指向自己，修正构造函数
    subType.prototype.constructor = subType; 
 }
 // 设置父类
 function SuperType(name) {
     this.name = name;
     this.colors = ["red", "blue", "green"];
     SuperType.prototype.sayName = function () {
       console.log(this.name)
     }
 }
 // 设置子类
 function SubType(name, age) {
     //构造函数式继承--子类构造函数中执行父类构造函数
     SuperType.call(this, name);
     this.age = age;
 }
 // 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
 inheritPrototype(SubType, SuperType)
 // 添加子类私有方法
 SubType.prototype.sayAge = function () {
    console.log(this.age);
 }
 var instance = new SubType("Taec",18)
 console.dir(instance)

// promise Queue
class Queue {
    promise = Promise.resolve();
  
    excute(promise) {
      this.promise = this.promise.then(() => promise);
      return this.promise;
    }
    
  }
  
  const queue = new Queue();
  
  const delay = (params) => {
    const time = Math.floor(Math.random() * 5);
    return new Promise((resolve) => {
      console.log(111,params);
      setTimeout(() => {
        resolve(params);
      }, time * 500);
    });
  };
  
  const handleClick = async (name) => {
    const res = await queue.excute(delay(name));
    console.log(res);
  };
  
  handleClick('A');
  handleClick('B');
  handleClick('C');
  handleClick('A');
  handleClick('C');
  handleClick('B');

  事件循环
  console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    queueMicrotask(() => console.log('queueMicrotask'))
    console.log('promise');
});

console.log('script end');
// 遇到 console.log 执行并打印
// 遇到 setTimeout，将回调加入宏任务队列
// 遇到 Promise.resolve()，此时状态已经改变，因此将 then 回调加入微任务队列
// 遇到 console.log 执行并打印
// 此时同步任务全部执行完毕，分别打印了 'script start' 以及 'script end'，开始判断是否有微任务需要执行。

// 微任务队列存在任务，开始执行 then 回调函数
// 遇到 queueMicrotask，将回到加入微任务队列
// 遇到 console.log 执行并打印
// 检查发现微任务队列存在任务，执行 queueMicrotask 回调
// 遇到 console.log 执行并打印
//*** */ 此时发现微任务队列已经清空，判断是否需要进行 UI 渲染。

// 执行宏任务，开始执行 setTimeout 回调
// 遇到 console.log 执行并打印

// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
    // 缓存一个定时器id
    let timer = 0
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
  // 不难看出如果用户调用该函数的间隔小于 wait 的情况下，上一次的时间还未到就被清除了，并不会执行函数