<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="board__top">
      <h1 class="board__title">註冊</h1>
      <div class="board__btn-block">
        <a class="board__btn" href="index.php">首頁</a>
        <a class="board__btn" href="login.php">登入</a>
      </div>
    </div>
    <form class="board_new-comment-form" method="POST" action="handle_register.php">
      <div class="board__nickname">
        <span>暱稱：</span>
        <input name="nickname" type="text">
      </div>
      <div class="board__nickname">
        <span>帳號：</span>
        <input name="username" type="text">
      </div>
      <div class="board__nickname">
        <span>密碼：</span>
        <input name="password" type="password">
      </div>

      <div class="board__error">
        <?php
        if(!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if($code === '1') {
            $msg = '錯誤：資料不齊全';
          } else if ($code === '2') {
            $msg = '錯誤：帳號已被註冊';
          }
          echo '<h2 class="error">' . $msg .  '</h2>';
        } 
        ?>
        <input class="board__submit-btn" type="submit" value="提交">
      </div>      
  </form>
  </main>
</body>
</html>