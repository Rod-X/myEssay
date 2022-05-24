// 1.定义常量状态
const PEDING = 'peding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
// 2.定义异步模拟函数
function asyncExecFunc(fn) {
  setTimeout(() => fn(), 0);
}

class MyPromise {
  // 定义一些变量作为临时存储
  status = PEDING
  value = undefined;
  reason = undefined;
  // 定义成功失败回调函数的数组，保证每个then的成功失败回调都会执行
  successCallback = []
  failCallback = []
  constructor(executor) {
    // 传入执行器函数
    // 立即执行执行器函数
    // 其中往执行器函数里面传入的回调都是异步方法
    try {
      executor(
        (value) => asyncExecFunc(() => this.resovle(value)),
        (reason) => asyncExecFunc(() => {
          this.reject(reason)
        }),
      )
    } catch (e) {
      this.reject(e)
    }
  }
  resovle(value) {
    // 等到执行器中的resolve方法执行
    // 改变状态并存储其中的值
    // 调用所有then方法中的成功函数
    if (this.status === PEDING) {
      this.status = FULFILLED
      this.value = value
      while (this.successCallback.length > 0) {
        this.successCallback.shift()()
      }
    }
  }
  reject(reason) {
    if (this.status === PEDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.failCallback.length > 0) {
        this.failCallback.shift()()
      }
    }
  }

  then(successCallback, failCallback) {
    // 保证then中不传入成功或失败回调函数作为参数时,promise的resolve的值能被后面的then接受
    successCallback = typeof successCallback === 'function' ? successCallback : v => v;
    failCallback = typeof failCallback === 'function' ? failCallback : (reason) => {
      throw reason
    };


    // then中会把successCallback函数执行结果作为新promise的resolve结果返回
    const promise = new MyPromise((resovle, reject) => {
      // 统一处理错误执行函数
      const execFunc = (fn, val) => {
        try {
          let res = fn(val)
          resolvePromise(promise, res, resovle, reject)
        } catch (e) {
          reject(e)
        }
      }
      // 成功回调执行器
      const execSuccessCallback = () => execFunc(successCallback, this.value)
      const execFailCallback = () => execFunc(failCallback, this.reason)
      // 此时状态还未改变,等待状态改变时再去执行存储起来的函数
      if (this.status === PEDING) {
        thiis.successCallback.push(execSuccessCallback)
        thiis.failCallback.push(execFailCallback)
        return
      }
      // 延迟执行这些函数保证resolvePromise的promise是返回的promise
      asyncExecFunc(() => {
        if (this.status === FULFILLED) {
          execSuccessCallback()
        } else
        if (this.status === REJECTED) {
          execFailCallback()
        }
      })
    })
    // then()返回一个新的promise
    return promise
  }
  // 接受reject的值--没有reject则不执行--
  // 本质就是执行then方法不传入成功回调
  catch (failCallback) {
    this.then(undefined, failCallback)
  }
  // 状态变更后-会执行一次的回调
  // 里面返回的依旧时promise,而且状态是跟上一个promise一样
  // 如果fianlly是一个异步promise函数,必须等这个异步resolve才能执行下一个then
  finally(callback) {
    return this.then(
      value => MyPromise.resovle(callback()).then(() => value),
      reason => MyPromise.resovle(callback()).then(() => {
        throw reason
      })
    )
  }
  static resovle(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise((resovle) => resovle(value))
  }

  static all(plist) {
    const list = []
    let len = plist.length
    let count = 0
    return new MyPromise((resolve, reject) => {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element instanceof MyPromise) {
          element.then(value => {
            list[index] = value
            count++
            if (count === len) {
              resolve(list)
            }
          }, reject)
        } else {
          list[index] = element
          count++
          if (count === len) {
            resolve(list)
          }
        }
      }
    })
  }
  race(arr) {
    return new MyPromise((resolve, reject) => {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element instanceof MyPromise) {
          element.then(resolve, reject)
        } else {
          resolve(element)
        }
      }
    })
  }

}
resolvePromise(promise, res, resovle, reject) {
  if (promise === res) {
    throw new Error('promise不能循环链式调用')
  }
  if (res instanceof MyPromise) {
    res.then(resovle, reject)
  } else {
    resovle(res)
  }
}