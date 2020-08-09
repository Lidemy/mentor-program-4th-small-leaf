## 什麼是 Ajax？
Ajax 全名為「Asynchronous JavaScript and XML」，重點是 Asynchronous（**非同步**）

以發送 request 來說，同步的狀態下必須在等待接收完 response 後，才能執行下一段程式碼，而非同步則是在發送 request 後，不需等 response 回傳，就馬上執行下一段程式碼

Ajax 是利用 JS 透過瀏覽器發送 request 給 server，接收到 response 後再經由瀏覽器轉傳給 JS，之後我們就可以將收到的資料，按照自己想呈現的內容及方式，新增在網頁上

## 用 Ajax 與我們用表單送出資料的差別在哪？
利用表單的方式發送資料，在瀏覽器接收到 response 之後，就會馬上 render 出返回的 html 文件，相對於表單接收資料後呈現的方式，Ajax 在接收資料後，更能客製化的呈現瀏覽器上的結果

儘管兩者接收的資料一樣，相對於每次返回都要重新刷新一次頁面，透過 Ajax 這種刷新部分資料的方式，不但能減少資源的佔用，也能有更好的使用者體驗

## JSONP 是什麼？
基於安全性的考量，瀏覽器中有個名為「同源政策（Same Origin Policy）」的規範，如果並非處於同個 domain 之下，瀏覽器就不會將返回的 response 給我們

但我們總是需要串聯別人的 API，於是有人將腦筋動到了 html 的標籤，例如`script`、`img`，透過這種不被同源政策限制的特性，以一個 function 的形式，將資料塞進裡面，之後再命名一個同名的 function 名稱，就可以順利呼叫所需的資料了，不過缺點就是你要帶過去的參數，永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST

例如：
```html
<script src="https://json.com">
  <!--網址返回的資料如下
  getData({
    data: 'test'
  })-->
</script>
<script>
  function getData (response) {
    console.log(response);
  }
</script>
```

## 要如何存取跨網域的 API？
除了 JSONP 之外，要在不同 domain 中交換資料，還可以透過 「跨來源資源共享（Cross-Origin Resource Sharing，CORS）」這項規範，server 必須在 response header 加上 `Access-Control-Allow-Origin`，當瀏覽器收到 response 後，會先檢查 `Access-Control-Allow-Origin` 內的內容，如果裡面有包含發起這個 request 的 origin 的話，才會讓我們接收這個 response

除了`Access-Control-Allow-Origin`之外，其實還可以自定義接收那些 method、header

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
上述所提到的「跨來源資源共享」、「同源政策」，都是瀏覽器上的規範，也就是說在交換資料的過程中，如果當中有瀏覽器參與才會有這些問題，而第四週是透過 node.js 交換資料，並沒有瀏覽器參與，自然就沒有所謂跨網域的問題了

透過瀏覽器交換資料就像是我們在網路上購物（發 request），物流業者將貨物運送到便利商店（瀏覽器接收到 response），我們到超商取貨之後，再比對你的手機末 3 碼（確認 request 的來源），確認之後再給你商品（瀏覽器再給我們 response），如果你是用 node.js 就會像是我們選擇宅配的方式（發 request），物流業者直接將貨物送達你家（server 直接給我們 response），中間就不會再經過便利商店（瀏覽器）替你取貨了
