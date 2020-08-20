<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  /*
    1. 從 cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案裡面讀取 session id 的內容
    3. 放到 $_SESSION 裡面 
  */

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $user = getUserFromUsername($_SESSION['username']);
    $username = $user['username'];
    $nickname = $user['nickname'];
  }

  $stmt = $conn->prepare('select * from small_leaf_comments order by id desc');
  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }

  $result = $stmt->get_result();
?>

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
      <h1 class="board__title">Comments</h1>
      <div class="board__btn-block">
        <?php if(!$username) { ?>
          <a class="board__btn" href="register.php">註冊</a>
          <a class="board__btn" href="login.php">登入</a>
        <?php } else { ?>
          <a class="board__btn" href="logout.php">登出</a>
        <?php } ?>
      </div>
    </div>
    <?php if(!empty($nickname)) { ?>
      <h3>你好！ <?php echo escape($nickname); ?></h3>
    <?php } ?>
    <form class="board_new-comment-form" method="POST" action="handle_add_comment.php">
      <textarea name="content" rows="5"></textarea>
      <div class="board__error">
        <?php
        if(!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if($code === '1') {
            $msg = '錯誤：未填寫內容';
          }
          echo '<h2 class="error">' . $msg .  '</h2>';
        } 
        ?>
        <?php if($username) { ?>
          <input class="board__submit-btn" type="submit" value="提交">
        <?php } else { ?>
          <h3>請先登入</h3>
        <?php } ?>
      </div>
  </form>
  <hr>
  <section>
    <?php
    while($row = $result->fetch_assoc()) {
    ?>
    <div class="card">
      <div class="card__avatar"></div>
      <div class="card__body">
        <div class="card__info">
          <span class="card__author">
            <?php echo escape($row['nickname']) ?>
          </span>
          <span class="card__time">
           <?php echo escape($row['created_at']) ?>
          </span>
        </div>
        <span class="card__content">
          <?php echo escape($row['content']) ?>
        </sapn>
      </div>
    </div>
    <?php } ?>
  </section>
  </main>
</body>
</html>
