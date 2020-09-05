## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### `雜湊`
特性：
* 將不定長度的輸入透過雜湊演算法，會輸出一段長度固定的雜湊值
* 同樣輸入，必定得到同樣輸出，但不同的輸入，也可能得到同樣的輸出，這種情況稱作「碰撞」

常見演算法：
* SHA 系列
* MD 系列

### `加密`
特性：
* 加密後的密文是可以透過密鑰來解密的
* 加密又分為「 對稱式加密 」、「 非對稱式加密 」

對稱式加密：
  * 密鑰要是太簡單或長度太短，安全性以及在實際應用上不夠理想，所以出現安全性更高，應用範圍更廣的非對稱式加密
  * 常見演算法： DES、3DES、AES
  
非對稱式加密：
  * 非對稱式加密演算法會有兩把鑰匙，一把稱做公鑰，另一把稱做私鑰
  * 非對稱式加密除了可以加密以外，還可以生成數位簽章，確認密文的傳送方身份真的是本人
  * 常見演算法：RSA、DSA、ECC
  
雜湊與加密最大的差別在於，雜湊是不可逆的，而加密可逆，會將使用者的密碼先經過雜湊再存入資料庫，是為了防止資料庫不慎外洩後，攻擊者無法直接看到明碼

## `include`、`require`、`include_once`、`require_once` 的差別
### `include`
* 適合用來引入**動態**的程式碼
* 執行時，如果 include 進來的檔案發生錯誤的話，會顯示警告，不會立刻停止
* 可以用在迴圈

### `require`
* 適合用來引入**靜態**的內容
* 執行時，如果 require 進來的檔案發生錯誤會顯示錯誤，立刻終止程式，不再往下執行。
* 不可以用在迴圈

#### `include_once`與`require_once`
功能上與 include、require 一樣，比較不一樣的地方在於引入檔案前，會先檢查檔案是否已經在其他地方被引入過了，若有，就不會再重複引入。

## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 的攻擊原理是攻擊者輸入我們非預期的字串，而這些字串會進而執行 SQL 的指令，透過這種方式來獲取資料庫的資訊，為了防止使用者輸入的字串被當成程式碼的一部份，我們可以透過 prepare statement，使這些字串跳脫字元

##  請說明 XSS 的攻擊原理以及防範方法
XSS 的攻擊原理也是攻擊者輸入我們非預期的字串進行攻擊，不過攻擊的語法則是以 HTML、JS 為主，在網頁顯示其資訊時，進而執行所預期的行為，為了防止使用者輸入的字串被當成程式碼的一部份，我們可以透過 htmlspecialchars，使這些字串跳脫字元，不管是 SQL Injection 還是 XSS，大原則就是只要是使用者可以自行控制的輸入內容，都要確保內容無法被當作程式碼的一部份，才能防止發生非預期的事件

## 請說明 CSRF 的攻擊原理以及防範方法
CSRF 的攻擊原理是利用瀏覽器自動帶上使用者 cookie 的機制，透過導向連結在使用者渾然不知得情況下，以你的身分執行目標網站的操作

防範方法：
* client 端：在每次使用完網站後，進行登出，就可以避免 CSRF
* server 端：
  * `檢查 Referer`：request 的 header 裡面會帶一個欄位叫做 referer，可以檢視這個 request 是來自哪個 domain，如果不是合法的 domain，就 reject 掉，不過並不是所有瀏覽器都會帶 referer，就算瀏覽器有帶，使用者也可以關閉自動帶 referer 的功能，這就會導致真的使用者發出的 request 都被 reject 掉，再來就是要保證判定是不是合法 domain 的程式碼必須沒有 bug，否則還是可以繞過這項限制
  * `加上驗證碼`：由於驗證碼只有使用者會收到，所以攻擊者就不可能攻擊了，但如果每次的操作都需驗證，對於使用者來說，這樣的體驗並不是很好
  * `加上 CSRF token`：在 form 裡面加上一個 hidden 的欄位，name 為 `csrftoken`，值為 server 隨機產生，並存在 server 的 session 中，在 submit 後，透過比對表單中的 csrftoken 與 session 內的值是否一致，藉此判斷是否為本人所發送的 request
  * `Double Submit Cookie`：同樣由 server 產生隨機的 token 值，一樣在表單放 csrftoken，但不存在 session 中，而是存在 client 端的 cookie 裡，由於瀏覽器的限制，攻擊者沒辦法讀寫目標網站的 cookie，所以 request 的 csrftoken 會跟 cookie 內的不一樣，所以他發上來的 request 的 cookie 裡面就沒有 csrftoken，就會被擋下來
  * `Client 端生成的 Double Submit Cookie`：這個方法則是由 client 端產生隨機的 token 值，並存放在 form 與 cookie 中，因為 token 本身的目的其實不包含任何資訊，只是為了不讓攻擊者猜出而已，所以由 client 還是由 server 來生成都是一樣的，只要確保不被猜出來即可
  * `browser 本身的防禦 - SameSite cookie `：原理就是幫 Cookie 再加上一層驗證，不允許跨站請求，除了我自己的網域，其他任何來自不同網域的 request 都不會帶上 cookie
  
  只要在設置 cookie 時加上 SameSite ，如下
  ```
  Set-Cookie: session_id=<id>; SameSite
  ```
  SameSite 分為兩種模式，「Strict」、「Lax」
    * `Strict`：默認值，不論是`<a href="">`、`<form>`、`new XMLHttpRequest`，只要是瀏覽器驗證不是在同一個 site 底下發出的 request，全部都不會帶上這個 cookie
    * `Lax`：Lax 模式則是放寬了一些限制，例如說`<a>`、`<link rel="prerender">`、`<form method="GET">`這些都還是會帶上 cookie，但是 POST 方法 的 form，或是只要是 POST, PUT, DELETE 這些方法，就不會帶上 cookie，需要特別注意的是，Lax 模式之下就沒辦法擋掉 GET 形式的 CSRF
