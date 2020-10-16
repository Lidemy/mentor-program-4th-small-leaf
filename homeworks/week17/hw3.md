## 什麼是 MVC？
MVC 是一種設計模式，透過 MVC 將程式碼區分成 Model、View、Controller 三大部分，Model 負責操作資料相關的工作，View 負責顯示畫面的相關工作，Controller 負責呼叫相對應的 Model 並 render 畫面，遵守 MVC 可以將各項職責切分開來，讓大家各司其職，也能更好維護程式碼和增加可讀性

## 請寫下這週部署的心得
在部屬的時候真的碰到蠻多問題的，雖然 [BE201] 的影片也有講解碰到問題時的處理方法，不過總會遇到一些影片中沒出現的問題，尤其是在連接資料庫的步驟，但這也是我覺得蠻好玩的地方，因為每解決一個未知的錯誤，都能更了解部屬的步驟中需要檢查哪些資訊，這種破關斬將的過程也頗有成就感的

每次在`git push heroku master`後，再按下重新整理的這個過程也是蠻觸目驚心的，雖然檔案是 push 上去了，但到底有沒有正常運作都還是要在按下重新整理的那刻才能得知，當你終於看到網頁能正常運行時真的是非常感動，能夠和 huli 在[串接 ClearDB 資料庫(TIME CODE 14:55)](https://lidemy.com/courses/390625/lectures/24510404)影片中一樣感同身受 XDDD

後來也花了一些時間在研究透過 MySQL Workbench、phpMyAdmin 連線在遠端的資料庫，這邊就順便貼個 phpMyAdmin 連線遠端資料庫的小筆記上來好了

---

* 透過 phpmyadmin 連線部屬在 heroku 的資料庫（ClearDB）
1. 先透過 cli 指令`$ heroku config --app <YOUR-APP-NAME>`就能拿到`CLEARDB_DATABASE_URL => mysql://username:password@host/database name?reconnect=true`
2. 接著到路徑 /phpMyAdmin/config.inc.php 的檔案下添加以下程式碼
```
$ i ++;
$ cfg ['Servers'] [$ i] ['host'] ='HostName：port'; //如果不是默認，則提供主機名和端口
$ cfg ['Servers'] [$ i] ['user'] ='userName';//遠程服務器的用戶名
$ cfg ['Servers'] [$ i] ['password'] ='Password'; //密碼
$ cfg ['Servers'] [$ i] ['auth_type'] ='config'; //將其保留為配置
```
將 CLEARDB_DATABASE_URL 中的資料，替換上即可

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
這週真的花蠻多時間在熟悉 MVC 的架構，不過在回頭看作業後，真的會蠻開心的，相比前幾週用 PHP 寫的大雜燴 code，現在的 code 整個煥然一新，功能明確的區分開來，可讀性增加超級多，也終於知道自己在前幾週用純 PHP 寫的 code 有多髒多難維護，講到這邊真的不得不感謝 huli 及助教們當時那麼用心地幫我們檢查作業，現在再回去看看這些 code 真的是非常頭痛，不過這種體悟也只有先經歷過寫純 PHP 才能得到的，我想能夠有這樣的體會，也說明自己應該也算是有些進步了吧！
