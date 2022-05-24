/**
 * 1 promise 就是一个类
 * 在执行这个类时要传递一个执行器 执行器会立即执行
 * 2.promise会有三个状态 分别时pending fulfilled reject状态一旦修改就不可改变
 * 3.resolve和reject是用来更改状态的
 *  resolve: filfilled
 *  reject :rejected
 * 4.then方法内部事情是判断状态
 *  如果成功就是fulfilled
 *  如果是失败则是reject
 * 5.then内部会将成功值传给resolveCallback
 *  会将错误值传递给rejectedCallback
 * 6.异步执行
 *  说明resolve()不会立即执行，所有then时传入的成功回调和失败回调不能直接执行。
 *  需要把成功和失败回调需要存储起来，当resolve或者rejected里面调用
 * 7.由于then可以被多次调用
 *  同步-直接将成功的回调执行
 *  异步情况下需要将回调存储到successCallback的数组中
 *  等待resolve时依次执行回调
 * 8.由于then的方法时可以被链式调用的
 *  下一个then的传参是由上一个then的回调函数的返回值
 *  每个then方法都是返回promise对象才能进行链式调用
 * 9.处理错误
 * 10.then().then().then(v=>v)这个v拿到初始的promise。rosolve的值
 * 
 * 11.filnally -- p1().finally(()=>{}).then(v=>cosole.log(v))
 * 
 * 12.catch会捕获未捕获的错误
 */
const PENDDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'reject'


class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      reject(e)
    }
  }
  //promise状态
  status = PENDDING
  //保存状态改变时的值
  value = undefined
  reason = undefined
  // 保存回调
  successCallback = []
  failCallback = []
  // 箭头函数为了让this指向Mypromise对象
  resolve = (val) => {
    // 验证状态是否被更改
    if (this.status !== PENDDING) {
      // 阻止向下执行
      return
    }
    this.status = FULFILLED
    this.value = val
    //判断成功回调是否存在，存在着调用
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length > 0) {
      this.successCallback.shift()()
    }
  }
  reject = (res) => {
    if (this.status !== PENDDING) {
      // 阻止向下执行
      return
    }
    this.status = REJECTED
    this.reason = res
    // 判断失败回调是否存在
    // this.failCallback && this.failCallback(this.value)
    while (this.failCallback.length > 0) {
      this.failCallback.shift()()
    }
  }
  then(successCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        if (!successCallback) {
          resolve(this.value)
          return
        }
        try {
          setTimeout(() => {
            let x = successCallback(this.value)
            // 判断 x 的值时普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promise对象返回结果
            // 在根据promse对象返回结果 决定调用resolve还是调用reject
            resolvePromse(promise2, x, resolve, reject)
            // resolve(x)
          }, 0);
        } catch (e) {
          reject(e)
        }
      } else if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            let x = failCallback(this.value)
            // 判断 x 的值时普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promise对象返回结果
            // 在根据promse对象返回结果 决定调用resolve还是调用reject
            resolvePromse(promise2, x, resolve, reject)
            // resolve(x)
          }, 0);
        } catch (e) {
          reject(e)
        }
      } else {
        // 等到
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          if (!successCallback) {
            resolve(this.value)
            return
          }
          try {
            setTimeout(() => {
              let x = successCallback(this.value)
              // 判断 x 的值时普通值还是promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promise对象返回结果
              // 在根据promse对象返回结果 决定调用resolve还是调用reject
              resolvePromse(promise2, x, resolve, reject)
              // resolve(x)
            }, 0);
          } catch (e) {
            try {
              setTimeout(() => {
                let x = failCallback(this.value)
                // 判断 x 的值时普通值还是promise对象
                // 如果是普通值 直接调用resolve
                // 如果是promise对象 查看promise对象返回结果
                // 在根据promse对象返回结果 决定调用resolve还是调用reject
                resolvePromse(promise2, x, resolve, reject)
                // resolve(x)
              }, 0);
            } catch (e) {
              reject(e)
            }
          }
        })
        this.failCallback.push(() => {
          if (!failCallback) {
            reject(this.reason)
            return
          }
          try {
            setTimeout(() => {
              let x = failCallback(this.reason)
              // 判断 x 的值时普通值还是promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promise对象返回结果
              // 在根据promse对象返回结果 决定调用resolve还是调用reject
              resolvePromse(promise2, x, resolve, reject)
              // resolve(x)
            }, 0);
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    // 返回promise才能实现链式调用
    return promise2
  };
  catch (failCallback) {
    return this.then(undefined, failCallback)
  };
  finally(callbcak) {
    return this.then((value) => {
      //等待callback执行完成再执行下一个then
      return MyPromise.resolve(callbcak()).then(() => value)
      // return value
    }, (reason) => {
      callbcak()
      throw reason
    })
  }

  // static挂载在函数对象上的方法
  static all(pList) {
    return new MyPromise((resolve, reject) => {
      const resList = []
      const len = pList.len
      let retNum = 0
      pList.forEach((p, i) => {
        if (p instanceof MyPromise) {
          p.then(v => {
            resList[i] = v
            retNum++
            if (len === retNum) {
              resolve(resList)
            }
          }, err => {
            reject(err)
          })
        } else {
          resList[i] = p
          retNum++
          if (len === retNum) {
            resolve(resList)
          }
        }

      });
    })
  }
  static resolve(val) {
    if (val instanceof MyPromise) {
      return val
    } else {
      return new MyPromise(resolve => {
        resolve(val)
      })
    }
  }
}

function resolvePromse(promise2, x, resolve, reject) {
  // console.log(promise2, x);
  if (promise2 === x) {
    reject('promise不需要自身返回自身')
    return
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
// MyPromise.resolve(1000).then(v=>{
//   console.log(v);
// })

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('成功')
  }, 2000);
})
p.then(v => {
  console.log(v);
}).catch(err => {
  console.log(err);
})

// 不允许自身返回自身
// const p = new MyPromise((resolve, reject) => {
//   console.log('p1');
//   resolve('成功')
// })
// let p1 = p.then(val => {
//   console.log(val);
//   throw new Error('test')
//   // return p1
// }).then(val => {
//   console.log('成功');
// }, err => {
//   console.log(err);
// })

// p.then((v) => {
//   console.log(0);
//   console.log(v);
//   return new MyPromise((resolve) => resolve(2000))
// }, (err) => {
//   console.log(err)
// }).then(v => {
//   console.log(v);
// })

// p.then((v) => {
//   console.log(1);
//   console.log(v);
// }, (err) => {
//   console.log(err)
// })

// p.then((v) => {
//   console.log(2);
//   console.log(v);
// }, (err) => {
//   console.log(err)
// })


Array.prototype.mycall = function (context, ...args) {
  context.fn = this
  const res = context.fn(...args)
  delete context.fn
  return res
}