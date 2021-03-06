/*
    1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
    2. Promise 中有3种状态 分别为 成功-fulfilled 失败-rejected 等待-pending
          pending -> fulfilled
          pending -> rejected
          一旦状态确定就不可更改
    3. resolve和reject函数就是用来更改状态的
          resolve：fulfilled
          reject：rejected
    4. then方法内部做的事情就是判断状态 如果状态是成功 就调用成功回调函数 如果状态是失败 就调用失败回调函数 then方法是被定义在原型对象中的
    5. then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败之后的原因
 */
const MyPromise = require("./myPromise");

const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('成功')
  // }, 3000)
  resolve('成功')
  // reject('失败')
})

function other () {
  return new MyPromise((resolve, reject) => {
    resolve('other')
  })
}

promise.then(res => {
  console.log(res);
  return other()
})
.then(res => {
  console.log(res);
})