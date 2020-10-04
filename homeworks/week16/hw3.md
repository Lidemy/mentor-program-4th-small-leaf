## hw3：Hoisting
```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
## 執行流程
1. 建立 global EC，初始化 VO
```js
global VO {
  fn: func,
  a: undefined
}
```
2. 執行程式碼
```js
global VO {
  fn: func,
  a: 1
}
```
3. 呼叫 fn()，建立 fn EC，初始化 AO
```js
fn AO {
   fn2: func,
   a: undefined
}
```
4. 執行`console.log(a)` 此時 fn AO 中的 a = undefined，所以輸出結果為 `{undefined}`
5. 執行 var a = 5，查看 fn AO 有沒有 a，有，為 a 賦值為 5
```js
fn AO {
   fn2: func,
   a: 5
}
```
6. 執行`console.log(a)` 此時 fn AO 中的 a = 5，所以輸出結果為 `{5}`
7. 執行 a++，查看 fn AO 有沒有 a，有，為 a 賦值為 6
```js
fn AO {
   fn2: func,
   a: 6
}
```
8. 呼叫 fn2()，建立 fn2 EC，初始化 AO
```js
fn2 AO {

}
```
9. 執行`console.log(a)` 此時 fn2 AO 中並未找到 a，於是往上一層的 fn AO 尋找
10. 查看 fn AO 有沒有 a，有，此時 此時 fn AO 中的 a = 6，所以輸出結果為 `{6}`
11. 執行`a = 20`，此時 fn2 AO 中並未找到 a，於是往上一層的 fn AO 尋找
12. 查看 fn AO 有沒有 a，有，為 a 賦值為 20
```js
fn AO {
   fn2: func,
   a: 20
}
```
13. 執行`b = 100`，此時 fn2 AO 中並未找到 b，於是往上一層的 fn AO 尋找
14. 查看 fn AO 有沒有 b，也沒有，繼續往上一層 global VO 尋找
15. 查看 global VO 有沒有 b，還是沒有，而且也已經最頂層了，由於我們是在非嚴格模式下執行程式碼，所以會將 b 宣告在 global VO 中
```js
global VO {
  fn: func,
  a: 1,
  b: 100
}
```
16. fn2 EC 執行結束，回到 fn EC 執行其餘程式碼
17. 執行`console.log(a)` 此時 fn AO 中的 a = 20，所以輸出結果為 `{20}`
18. fn EC 執行結束，回到 global EC 執行其餘程式碼
19. 執行`console.log(a)` 此時 global AO 中的 a = 1，所以輸出結果為 `{1}`
20. 執行`a = 10`，查看 global VO 有沒有 a，有，為 a 賦值為 10
21. 執行`console.log(a)` 此時 global AO 中的 a = 10，所以輸出結果為 `{10}`
22. 執行`console.log(b)` 此時 global AO 中的 b = 100，所以輸出結果為 `{100}`
 
## 輸出結果
```js
undefined
5
6
20
1
10
100
```
