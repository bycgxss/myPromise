const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
  constructor (executor) {
    executor(this.resolve, this.reject)
  }
  // promise 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []

  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在 如果存在就调用
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败之后的原因
    this.reason = reason
    // 判断失败回调是否存在 如果存在就调用
    // this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) this.failCallback.shift()(this.reason)
  }
  then (successCallback, failCallback) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = successCallback(this.value)
        // 判断 x 的值是普通值还是promise对象
        // 如果是普通值，直接调用 resolve
        // 如果是promise对象 查看promise对象返回的结果
        // 再根据promise返回结果 决定调用resolve还是reject
        resolvePromise(x, resolve, reject)
      } else if (this.status === REJECTED) {
        failCallback(this.reason)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })
    return promise2
  }
}

function resolvePromise (x, resolve, reject) {
  if (x instanceof MyPromise) {
    // promise 对象
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise