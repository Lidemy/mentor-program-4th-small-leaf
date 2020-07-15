## 請以自己的話解釋 API 是什麼
API 的全名為（ Application Programming Interface），簡單來說就是一個溝通用的 Interface（介面），這樣說可能還是有點抽象，那麼讓我試著用玩遊戲這個情境來比喻一下，就像我們在玩遊戲時遇到外掛一樣，而且外掛還不只一種，有的可以穿牆，有的可以自瞄等，當你的遊戲體驗被破壞，又不甘只當別人的沙包時，你也能透過使用別人的外掛包（API），讓自己在遊戲中變得天下無敵手

為了讓自己的排名維持在伺服器 NO.1，於是安裝了數之不盡的外掛包，但也因此觀察到了一個現象，有的外掛包設定項目一樣（WEB API），有的卻完全不一樣（自定義 API），為了省去設定的繁雜性，於是自己開始改寫外掛包的設定項目使之統一（RESTful API），讓自己需要使用時不必再翻找設定指南，但這也僅僅只是統一了自己有的外掛包，網路上的外掛包依舊還是原本地的設定

總之，當你需要使用他人的服務就可以利用串接 API，使用他人的服務功能，反之也能將自己的 API 分享給別人使用，但 API 是可以有「限度」的開放使用，別人只能使用指定的功能，如果想利用進階的功能就需要付費

一般的 WEB API，基本上也可以看做 HTTP API，因為這類型的 API 通常都會遵守 HTTP 的協定，當然，不遵守也是可以的，但在串接 API 的方式也會有些許差異，這些都可以在第三方提供的 API 文件中查詢到


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
* 403 Forbidden：沒有權限

* 429 Request Header Fields Too Large：用戶在一定的時間內發送了太多的 request

* 413 Payload Too Large：由於發送的 request 的數據過大，伺服器拒絕處理當前的 request


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
* Restaurant API 
Base URL：https://smallleaf/restaurant.com
### 簡易操作表格

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 獲取所有餐廳資訊 | GET    | /restaurants   | _limit:限制回傳資料數量           | /restaurants?_limit=5 |
| 獲取單一餐廳資訊 | GET    | /restaurants/:id | 無                    | /restaurants/7      |
| 新增餐廳   | POST   | /restaurants     | name: 餐廳名稱 | 無              |
| 刪除餐廳   | DELETE   | /restaurants/:id     | 無 | 無              |
| 更改餐廳資訊   | PATCH   | /restaurants/:id     | name: 餐廳名稱| 無              |

### API 操作文件
* GET /restaurants

**Resource URL**

`https://smallleaf/restaurant.com/restaurants`

**Resource Information**

| | |
|---|---|
|Response formats|JSON|
|Requires authentication?|No|

**Parameters**

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|`limit`|optional	|總共顯示幾筆餐廳，最小值：10，最大值：50|/restaurants?limit=5|/restaurants?limit=10|

**Example Request**

`https://smallleaf/restaurant.com/restaurants/limit?=5`

**Example Response**

```
[
  {
    "id" : 1,
    "name" : "老饕客"
  },
  {
    "id" : 2,
    "name" : "大饕客"
  },
  {
    "id" : 3,
    "name" : "小饕客"
  },
  {
    "id" : 4,
    "name" : "中饕客"
  },
  {
    "id" : 5,
    "name" : "隨便饕"
  },
] 
```
---


* GET /restaurants/<id>
  
**Resource URL**

`https://smallleaf/restaurant.com/restaurants/<restaurant id>`
  
**Resource Information**

| | |
|---|---|
|Response formats|JSON|
|Requires authentication?|No|

**Parameters**

None

**Example Request**

`GET https://smallleaf/restaurant.com/restaurants/5`

**Example Response**

```
{
  "id" : 5,
  "name" : "蒜好吃"
},
```
---

* DELETE /restaurants/<id>
  
**Resource URL**

`https://smallleaf/restaurant.com/restaurants/<restaurant ID>`  

**Resource Information**  

| | |
|---|---|
|Response formats|JSON|
|Requires authentication?|Yes|

**Parameters**

None

**Example Request**

`DELETE https://smallleaf/restaurant.com/restaurants/15`

**Example Response**

`204`

---


* POST /restaurants

**Resource URL**

`https://smallleaf/restaurant.com/restaurants/<restaurant ID>`

**Resource Information**  

| | |
|---|---|
|Response formats|JSON|
|Requires authentication?|Yes|

**Parameters**

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|`id`|required	|餐廳 id| |NaN|
|`name`|required	|餐廳名稱。最大字數限制：10 個字| |NaN|

**Example Request**

`POST https://smallleaf/restaurant.com/restaurants/id=7&name='蒜好吃'`

**Example Response**

```
{
    "id" : 7,
    "name" : "蒜好吃"
  },
```
---

* PATCH /restaurants/<id>

**Resource URL**

`https://smallleaf/restaurant.com/restaurants/<restaurant ID>`

**Resource Information**  

| | |
|---|---|
|Response formats|JSON|
|Requires authentication?|Yes|

**Parameters**

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|`id`|required	|餐廳 id| |NaN|
|`name`|required	|餐廳名稱。最大字數限制：10 個字| |NaN|

**Example Request**

`PATCH https://smallleaf/restaurant.com/restaurants/id=7&name='醬好吃'`

**Example Response**

```
{
    "id" : 7,
    "name" : "醬好吃"
  },
```
