## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `<figure>`：用於包裝一段獨立的內容，經常與`<figcaption>`一起使用，`<figcaption>`則用與當前內容相關的說明或標題，所以通常放置在`<figure>`區塊內的第一行或最後一行

2. `<datalist>`：可表現出下拉式選單的樣式，常與`<input>`搭配使用，內含了多個`<option>`元素（選項）

3. `<blockquote>`：引用其他出處的內容，可以使用`cite`標明出處的 url

## 請問什麼是盒模型（box modal）
是 html 用於空間定位的模型，分別區分成以幾種區塊

* `content`：內容通常以文字或圖片為主，區塊大小則是以 width、height 所控制

* `padding`：區塊範圍為 content 到 border 之間（內距）

* `border`：邊寬，可透過

* `margin`：區塊範圍為 border區塊範圍為 border 之外的範圍，明確範圍可透過 css 設定

### box-sizing 屬性
1. content-box：為預設值，在這種模式下更改`padding`、`border`、`margin`時，都是以維持`content`原有尺寸大小的情形下做更動，也就是說區塊是向外長的

2. border-box：這種模式下則是以維持`border`原有尺寸大小的情形下做更動，不管是更改`padding`、`border`，都會維持`border`原有的寬度，也就是說區塊是向內壓縮的

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
* `inline`：這種屬性的元素可以與其他元素相排列，需要注意的是不管我們調多少寬高都不會有變動，主要還是以內容為主，再來最常搞混的地方就是更改`padding`、`margin`時的狀況，在調整 padding 時候，左右的 padding 是有作用的（會影響其他元素的），但上下的 padding 則不會有作用（padding 的區塊有延伸出去，但不會影響其他元素，自身的 content 也不會跟著移動），而 margin 則是只有在調整左右 margin 才會變動，可以想像成在`inline`時都是以**行**為主來做調整

* `block`：不管事調整`padding`、`margin`都會有作用，比較需要注意的則是`block`屬性下的元素都會獨自佔滿一行，所以在排列方式則是會不斷地換行，向下排列

* `inline-block`：同時擁有`inline`和`block`的優點，能夠能夠像 inline 一樣，與其他元素並排，又能像 block 一樣調整 padding、margin，不過在這種屬性下有個小陷阱，那就是空白字元，常常會在 html 換行的空白處發現它，解決方式有很多種，我的話通常是將它註解調或從字元下手

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
* `static`：為預設值，正常的排版流（按照元素的先後順序），無法利用 top、left、bottom、right 調整元素位置

* `relative`：為相對定位，是以元素**原本的位置**作為定位點來位移，可以利用 top、left、bottom、right 調整元素位置，而且不會影響（推擠）相鄰的元素，而是以推疊的方式覆蓋在其他元素上

* `absolute`：為絕對定位，會跳脫原本的排版流，後面的元素會自動遞補指定元素原本的空間，而被指定的元素則會向上層尋找 position 屬性不是 static 的元素作為定位點，若沒找到就會把 body 當作定位點，一樣可以利用 top、left、bottom、right 調整元素位置，也不會影響（推擠）相鄰的元素，而是以推疊的方式覆蓋在其他元素上


* `fixed`：類似絕對定位，會跳脫原本的排版流，後面的元素會自動遞補指定元素原本的空間，在不以 top、left、bottom、right 調整元素位置時，元素會停留在原本排序的位置，在調整後，元素則是以 viewport 作為定位點進行位移，不會因為滑動頁面造成元素移動，這種模式同樣不會影響（推擠）相鄰的元素，而是以堆疊的方式覆蓋在其他元素上
