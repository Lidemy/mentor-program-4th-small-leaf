## hw2：Event Loop + Scope
```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
## 執行流程
1. 設定變數 i = 0，判斷 i 是否 < 5，是，繼續執行，開始進入第一圈迴圈
2. 輸出 i: 0
3. 將`setTimeout(() => { console.log(i) }, 1000)`放入 call stack 執行，在經過 0 毫秒後呼叫`() => { console.log(i) }`，由於 setTimeout 屬於 WebAPI，
所以將`() => { console.log(i) }`排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
4. 設定變數 i = 1，判斷 i 是否 < 5，是，繼續執行，開始進入第二圈迴圈
5. 輸出 i: 1
6. 將`setTimeout(() => { console.log(i) }, 1000)`放入 call stack 執行，在經過 1000 毫秒後呼叫`() => { console.log(i) }`，由於 setTimeout 屬於 WebAPI，
所以將`() => { console.log(i) }`排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
7. 設定變數 i = 2，判斷 i 是否 < 5，是，繼續執行，開始進入第二圈迴圈
8. 輸出 i: 2
9. 將`setTimeout(() => { console.log(i) }, 1000)`放入 call stack 執行，在經過 2000 毫秒後呼叫`() => { console.log(i) }`，由於 setTimeout 屬於 WebAPI，
所以將`() => { console.log(i) }`排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
10. 設定變數 i = 3，判斷 i 是否 < 5，是，繼續執行，開始進入第二圈迴圈
11. 輸出 i: 3
12. 將`setTimeout(() => { console.log(i) }, 1000)`放入 call stack 執行，在經過 3000 毫秒後呼叫`() => { console.log(i) }`，由於 setTimeout 屬於 WebAPI，
所以將`() => { console.log(i) }`排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
13. 設定變數 i = 4，判斷 i 是否 < 5，是，繼續執行，開始進入第二圈迴圈
14. 輸出 i: 4
15. 將`setTimeout(() => { console.log(i) }, 1000)`放入 call stack 執行，在經過 4000 毫秒後呼叫`() => { console.log(i) }`，由於 setTimeout 屬於 WebAPI，
所以將`() => { console.log(i) }`排進 callback queue，執行結束後，setTimeout 就會從 call stack 中 pop 掉
16. 設定變數 i = 5，判斷 i 是否 < 5，否，跳出迴圈
17. event loop 偵測到 call stack 為空，將 callback queue 中的程式按照順序依序放入 call stack 中
18. 將`console.log(i)`放入 call stack，由於本身 EC 的 AO 找不到 i，所以找到上層 global EC 的 VO，此時 i 為 5
19. 輸出 5，清空 call stack
20. 將`console.log(i)`放入 call stack，由於本身 EC 的 AO 找不到 i，所以找到上層 global EC 的 VO，此時 i 為 5
21. 輸出 5，清空 call stack
22. 將`console.log(i)`放入 call stack，由於本身 EC 的 AO 找不到 i，所以找到上層 global EC 的 VO，此時 i 為 5
23. 輸出 5，清空 call stack
24. 將`console.log(i)`放入 call stack，由於本身 EC 的 AO 找不到 i，所以找到上層 global EC 的 VO，此時 i 為 5
25. 輸出 5，清空 call stack
26. 將`console.log(i)`放入 call stack，由於本身 EC 的 AO 找不到 i，所以找到上層 global EC 的 VO，此時 i 為 5
27. 輸出 5，清空 call stack

## 輸出結果
```js
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
