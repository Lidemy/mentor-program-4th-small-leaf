## hw4：What is this?
```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
## 執行流程
在解題前先來補充一下關於 this 在各種情況下的值
1. 在物件導向中，this 所指的就是自己的 instance
2. 在非物件導向中
  * 嚴格模式底下就都是`undefined`
  * 非嚴格模式，瀏覽器底下是`window`
  * 非嚴格模式，node.js 底下是`global`
3. 物件中的 this 則是能夠透過`call`、`apply`、`bind `來更改 this 的值
4. 可以把 a.b.c.hello() 看成 a.b.c.hello.call(a.b.c)，以此類推，透過這種轉化的方式就能輕鬆找出 this 的值

**this 的值跟作用域跟程式碼的位置在哪裡完全無關，只跟「你如何呼叫」有關**

ok，那就讓我們開始吧！

1. `obj.inner.hello()`，利用轉化的方式，就能得到`obj.inner.hello.call(obj.inner)`，這樣我們馬上就能知道 this 指的是 obj.inner，
帶入函式就能得到`obj.inner.value`，所以輸出結果就是 2 啦
2. `obj2.hello()`，利用轉化的方式，就能得到`obj.inner.hello.call(obj.inner)`，與上題一樣，那麼輸出結果依然是 2 啦
3. `hello()`，再次利用轉化的方式，可以得到`hello.call()`，由於 hello 前面沒有東西，所以會呼叫全域物件，在嚴格模式底下就都是`undefined`，
非嚴格模式，瀏覽器底下是`window`，node.js 底下則是`global`，但無論 runtime 是瀏覽器還是 node.js，在全域環境中都找不到 value 的值，所以都會印出 undefined

## 執行結果
```js
2
2
undefined
```
