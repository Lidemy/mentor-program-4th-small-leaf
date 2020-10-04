## hw1：Event Loop
```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

## 執行流程
講解前先附上一 Event Loop 的流程圖比較容易理解一點
![](https://blog.huli.tw/img/js-async/eventloop.png)
1. 將`console.log(1)`放入 call stack 執行，輸出 1
2. 將`setTimeout(() => { console.log(2) }, 0)`放入 call stack 執行，在經過 0 秒後呼叫`() => { console.log(2) }`，由於 setTimeout 屬於 WebAPI，
所以將 `() => { console.log(2) }` 排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
3. 將`console.log(3)`放入 call stack 執行，輸出 3
4. 將`setTimeout(() => { console.log(4) }, 0)`放入 call stack 執行，在經過 0 秒後呼叫`() => { console.log(4) }`，由於 setTimeout 屬於 WebAPI，
所以將 `() => { console.log(4) }` 排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
5. 將`console.log(5)`放入 call stack 執行，輸出 5
6. event loop 偵測到 call stack 為空時，就會將 callback queue 中的程式按照順序依序放入 call stack 中
7. 將`console.log(2)`放入 call stack，輸出 2
8. 將`console.log(4)`放入 call stack，輸出 4

## 輸出結果
```js
1
3
5
2
4
```
