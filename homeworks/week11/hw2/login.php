<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>部落格</title>
  <link rel="stylesheet" href="index.css" />
  <link rel="icon" type="image/png" href="LOGO0.png"/>
</head>
<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="post_list.php">文章列表</a></li>
          <li><a href="category_list.php">分類專區</a></li>
          <li><a href="about_me.php">關於我</a></li>
        </div>
        <div>
          <?php if(!empty($username)) { ?>
            <li><a href="admin.php">管理後台</a></li>
            <li><a href="logout.php">登出</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="login-main">
    <div class="login-wrapper">
      <h2>Login</h2>
      <form action="handle_login.php" method="POST">
        <div class="input__wrapper">
          <div class="input__label">USERNAME</div>
          <input class="input__field" type="text" name="username" />
        </div>
        
        <div class="input__wrapper">
          <div class="input__label">PASSWORD</div>
          <input class="input__field" type="password" name="password" />
        </div>
        <?php if(!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if($code === '1') {
              $msg = '錯誤：資料不齊全';
            } else if ($code === '2') {
              $msg = '錯誤：帳號或密碼輸入錯誤';
            }
            echo '<span class="error">' . $msg . '</span>';
          } ?>
        <input type='submit' value="登入" />
      </form>
      
    </div>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>