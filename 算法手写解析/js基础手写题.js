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

  /**
   * 防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

//   Event Bus
class Events {
    constructor() {
      this.events = new Map();
    }
  
    addEvent(key, fn, isOnce, ...args) {
      const value = this.events.get(key) ? this.events.get(key) : this.events.set(key, new Map()).get(key)
      value.set(fn, (...args1) => {
          fn(...args, ...args1)
          isOnce && this.off(key, fn)
      })
    }
  
    on(key, fn, ...args) {
      if (!fn) {
        console.error(`没有传入回调函数`);
        return
      }
      this.addEvent(key, fn, false, ...args)
    }
  
    fire(key, ...args) {
      if (!this.events.get(key)) {
        console.warn(`没有 ${key} 事件`);
        return;
      }
      for (let [, cb] of this.events.get(key).entries()) {
        cb(...args);
      }
    }
  
    off(key, fn) {
      if (this.events.get(key)) {
        this.events.get(key).delete(fn);
      }
    }
  
    once(key, fn, ...args) {
      this.addEvent(key, fn, true, ...args)
    }
  }

//   instanceof
function myInstanceof(letf,right) {
    let proto = letf.__proto__
    let prototype = right.prototype
    while (true) {
        if (proto === null) {
            return false
        }
        if (proto === prototype) {
            return true
        }
        proto = proto.__proto__
    }
}
// call
function myCall(ctx,...args) {
    ctx  = ctx || window
    let fn = Symbol()
    ctx[fn] = this
    const result = ctx[fn](...args)
    delete context[fn]
    return result
}
// apply
Function.prototype.myApply = function(context) {
  context = context || window
  let fn = Symbol()
  context[fn] = this
  let result
  if (arguments[1]) {
    result = context[fn](...arguments[1])
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}

// bind
Function.prototype.myBind = function (ctx) {
  ctx = ctx || window
  const fn  = Simbol()
  ctx[fn] = this
  const args = [...arguments].slice(1)
  return function (...args2) {
    const result = ctx[fn](...args,...args2)
    delete ctx[fn]
    return result
  }
}

// 使用正则提取url上面的参数
function getParmas(url) {
  const params = {}
  url.replace(/[\?&#](\w+)=([^\?&#]+)/g,(...args)=>{
      params[args[1]] = args[2]
  })
  return params
}

// "v"+[0]+"_"+(null*false-0)+"v" 的结果
'v0_0v'
// "v"+([0].toString())+"_"+(Number(null)*Number(false)-0)+"v"

// [1, 2, 3] + [4, 5, 6] 的结果
'1,2,34,5,6'
// = [1,2,3].toString() + [4,5,6].toString()
// = “1,2,3” + “4,5,6”

// const 对象的属性可以修改吗？
// 用const定义基本数据类型不可被修改；
// 用const定义引用数据类型（引用数据类型会在内存额外开辟一块空间存放），不可以修改“内存地址”，但是可以修改里边的属性

// script标签中 defer和 async属性的区别。
// 区别如下。
// （1） defer属性规定是否延迟执行脚本，直到页面加载为止， async属性规定脚本一旦可用，就异步执行。
// （2） defer并行加载 JavaScript文件，会按照页面上 script标签的顺序执行， async并行加载 JavaScript文件，下载完成立即执行，不会按照页面上 script标签的顺序执行。