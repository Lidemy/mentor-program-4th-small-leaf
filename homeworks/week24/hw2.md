## Redux middleware 是什麼？
在原來的 Redux 的資料流中，我們只能 dispatch 一個 obj 的 action，所以就不能做出像是非同步這樣的 side effect，不過如果使用了 Redux middleware 就可以在 action 抵達 store 之前，事先轉換 action 的內容再傳進 store

以 Redux thunk 這個 middleware 為例，我們不只可以在 action 中放入 obj 還能放入 function，再 dispatch 之後，Redux thunk 就會幫我們執行 action 中 function，如果沒有其他 middleware，待執行完畢後就會將執行結果傳進 store

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
* `CSR`：CSR 是指網頁的畫面都是在前端由 JS 動態產生，所以當我們查看網頁原始碼時，只會看到沒什麼內容的 HTML，所以也會導致搜尋引擎在爬資料時，獲取不到網站的相關資料也意味著不利於 SEO 優化
* `SSR`：SSR 則是為了解決 SEO 優化問題的解決辦法，在網頁首次載入頁面時，伺服器會將內容都事先放到 HTML 中，所以當我們再次查看網頁原始碼時，就可以看到含有完整內容的 HTML

## React 提供了哪些原生的方法讓你實作 SSR？
在 `react-dom/server` 中有兩個方法 `renderToString` 和 `renderToStaticMarkup` 可以在 server 端渲染你的 components，主要都是將 React Component 在 Server 端轉成 DOM String，但對於事件處理會失效，因為 event handler 是屬於 JS ，這時就可以在 client 端加上 `ReactDOM.hydrate()`，將 JS 功能重新放回到已經被 server 端所轉譯的 HTML 上

`renderToString` 和 `renderToStaticMarkup` 最大的差別在於 `renderToStaticMarkup` 會少加一些 React 內部使用的 DOM 屬性，例如：data-react-id，因此可以節省一些資源

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種
* `Prerender`：Prerender 會預先將網站執行完 JS 的渲染結果 cache 住，當搜尋引擎的爬蟲造訪網站時，就能把之前快取的渲染結果回傳給它
* `Next.js`：是一套以 React 為基礎的 SSR 框架，Next.js 支援 SSG 和 SSR 兩種 pre-rendering 方式，SSG 的 HTML 在 build time 時就由 server 產生好，並且在之後的 client request 都會共用這個 HTML，而 SSR 則是每當有 client 發起對某個頁面的 request 時，server 會抓取對應的資料，建立完整的 HTML，最後再回傳給 client
