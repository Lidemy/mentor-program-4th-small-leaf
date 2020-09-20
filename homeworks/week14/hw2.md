## 部署

本篇採用一個參考資源濃縮的方式介紹部署步驟

* step1 安裝 ubuntu

文章：[如何安裝Ubuntu Server 20.04來架設伺服器？](https://magiclen.org/ubuntu-server-20-04/)

文章提到是透過調整 bios 開機順序去調整，但我其實不太想去動 bios 的設定，所以就跑去載了 virtual box，然後在將載好的 [ubuntu（server版）](https://ubuntu.com/download/server) 丟進去

詳細可參考[安裝設定#03. [Windows]於VirtualBox上安裝Ubuntu18.04](https://www.youtube.com/watch?v=g5WqEmQrS1Y)

* step2 眼花撩亂的指令

跟著[影片](https://www.youtube.com/watch?v=kOHiDHb38MU)到最後應該就可以進入 ubuntu 了，之後可以參考[這篇文章](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)，
我為了省略一些不必要的麻煩，個人在**設定 phpmyadmin**
的第七點，密碼強度的部分我是選 0，當然也可以選擇 1 或 2，但就是檢查的比較嚴格，不過這部分也不用擔心，還是能夠透過[指令](https://blog.vvtitan.com/2018/04/mysql%E6%9B%B4%E6%94%B9%E5%AF%86%E7%A2%BC%E9%A1%AF%E7%A4%BA%E3%80%8Cerror-1819-hy000-password-satisfy-current-policy-requirements%E3%80%8D%E9%8C%AF%E8%AA%A4%E8%A8%8A%E6%81%AF%E7%9A%84%E8%99%95/)來更改密碼強度和密碼長度的

* step3 設定 DNS

[程式導師實驗計畫：Lesson 8-3 之 hw8 作業檢討](https://youtu.be/w6MN-N2OFTg?t=1360)

* step3 上傳檔案
> FileZilla
    > 要把協定改成 SFTP
    > 主機填 EC2 的 IPv4 Public IP
    > 登入方式選「金鑰檔案」
    > 使用者 ubuntu
    > 金鑰檔案按瀏覽選擇 .pem 的那個
    > 連上後去 /var/www/html 資料夾放檔案

如果在傳檔案時出現 `permission denied`
只要輸入以下指令就可以了
```
sudo chown -R ubuntu:ubuntu /var/www/html

sudo chmod -R 755 /var/www/html
```
想測試能不能連線到新資料庫，記得先去改 conn.php 檔案內的帳號和密碼，才會成功連線喔

## 修改錯誤
當你將原本資料庫的檔案匯入到新的資料庫，在點選時可能會跳出以下錯誤訊息

![](https://2.bp.blogspot.com/-2d5ykm8Bz0A/W_Y7QfRVNDI/AAAAAAAABsY/onfDPDDK08w_v6RKYNn8Vs7yWUmr3lOUQCLcBGAs/s320/0001.png)

解決方案：
1. 編輯 /usr/share/phpmyadmin/libraries/sql.lib.php
   `$sudo pico /usr/share/phpmyadmin/libraries/sql.lib.php`
   將(count($analyzed_sql_results['select_expr'] == 1)
   修改成
       ((count($analyzed_sql_results['select_expr']) == 1)
       
2. 重啟apache2
   `$sudo service apache2 restart`
   
## 參考大全
最後附上我參考的文章和影片

文章：[設定 AWS EC2 遠端主機](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)、[安裝 LAMP Server + phpMyAdmin 在 Linux 系統上輕鬆架設網站](https://magiclen.org/lamp/)

影片：[AWS基本使用#01](https://www.youtube.com/watch?v=roIzxMx-XHc)、[ AWS基本使用#02](https://www.youtube.com/watch?v=M0haiLTvTp4)、[AWS基本使用#03](https://www.youtube.com/watch?v=kOHiDHb38MU)
