## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
對於電腦來說要造訪一個網站，其實都是透過 IP 位置連接該網站伺服器，但眾所皆知 IP 就是一串數字所組成，這種沒什麼特殊涵義的數字，真的不是那麼好記，這就像你向朋友打招呼一樣，你會說出他的名字還是說出他的身分字號一樣。為了更利於記憶，所以我們會輸入網址來代替，而 DNS 就是幫我們將網址名稱轉換為 IP 的工具，通常在沒有特別指定 DNS 的情況下，預設都會是 ISP 提供的 DNS，當然也可以自訂

提供免費的 DNS 對於 Google 來說的好處，不外乎是為了蒐集使用者的數據、分析使用者行為，再依據數據進而提供其他更精確的服務，對用戶來說，由於 Google 掌握了相對更完整的數據，而且伺服器也遍布各地，所以在轉換上也會相對快速且穩定

## 什麼是資料庫的 lock？為什麼我們需要 lock？
當我們對同一筆資料同時進行多項操作時，由於沒辦法確保處理的先後順序，為了維持資料的完整性，以及防止造成 Race condition 的情況，我們可以在 transaction 中加入 lock，透過 lock 暫時鎖住指定欄位，使其依序處理，但也因為 lock 的特性，在後續的操作需要等待所以就會造成效能上的損耗

## NoSQL 跟 SQL 的差別在哪裡？
* SQL 在儲存上資料前，必須事先定義好 schema 才能儲存資料（嚴謹），NoSQL 則是以 key-value 的方式存資料，比較沒有一定的對應關係（寬鬆）
* SQL 可以透過 SQL 語法查詢資料（CRUD），NoSQL 通常是使用簡單的 API 來存取資料
* SQL 的查詢中提供了 JOIN 的語法，可以一次關聯多張 table 的相關資料，NoSQL 則是把相關的資料一次包進去
* SQL 在 transaction 設計中的特性為 ACID（Atomicity、Consistency、Isolation、Durability），較能確保資料的完整性，NoSQL資料庫大多沒有 transaction 的設計，而是採用了另外一個不同的 CAP（Consistency、Availability、Partition Tolerance）資料庫理論，理論上無法同時兼顧 CAP 這三種特性，NoSQL 資料庫通常會選擇其中兩種特性來設計，大多是 CP 或 AP

## 資料庫的 ACID 是什麼？
在資料庫進行 transaction 的操作時，為了確保資料的完整性，必須符合 ACID 這四項特性

* Atomicity（原子性）

每一筆 transaction 不是全部成功、就是全部失敗，如果發生錯誤就 rollback 當作什麼事都發生過

* Consistency（一致性）

在交易前後依舊維持資料的一致性，舉例來說：A 有 100 元，B 有 100 元，不管他們交易金額怎麼變動，最後兩人的金額加起來一定還是 200

* Isolation（隔離性）

在每一筆 transaction commit 之前，都不會執行另一筆 transaction，透過這種排序的方式，確保資料的完整性

* Durability（持續性）

交易完成後對資料的修改是永久的，資料不會因為系統重啟或錯誤而消失。
