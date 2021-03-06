## 為什麼我們需要 React？可以不用嗎？
React 可以讓我們將 component 拆分開來，每個 component 也都有自己的樣式及邏輯，React 還能幫我們將「資料」與「畫面」做連結，一旦資料的狀態更動，就會連動更改相關的畫面，透過這樣的渲染方式，我們只要關注在資料上就好了，不必擔心資料更動畫面卻沒同步的狀況發生

對於一些靜態網頁或規模不是很大操作簡單的專案來說，或許直接使用 CSS、HTML、JS 會比使用 React 來的方便也更有效率

## React 的思考模式跟以前的思考模式有什麼不一樣？
相比以往的作業，我們必須要同時更改資料及畫面，萬一其中有一個步驟沒統一，就很有可能發生資料與畫面不同步的情形，而現在使用 React 則是只要專注在資料上面就好，畫面會連動渲染，在實作上也要去極力避免直接去 DOM tree 上抓取元素或更動資料，以防出現預期外的 Bug 發生

在切板時，也必須考慮到 component 在專案中可以重複使用的地方，再決定要如何拆分才能更有效率的使用這些元件

## state 跟 props 的差別在哪裡？
state 是 component 本身的資料，只有只有這個 component 才能改變自己的 state

props 則是被父層當作參數傳遞給子層的 state，如果子層想更改這個 props，父層必須將改變 state 的方法一起傳遞給子層
