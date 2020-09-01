<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_GET['id'];  
  $page = $_GET['page'];
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $user = getUserFromUsername($_SESSION['username']);
    $username = $user['username'];
    $nickname = $user['nickname'];
  }

  $stmt = $conn->prepare(
		'select * from small_leaf_comments where id=?'
  );
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
      <h1 class="board__title">編輯留言</h1>
    </div>
    <form class="board_new-comment-form" method="POST" action="handle_update_comment.php?page=<?php echo $page ?>">
      <textarea name="content" rows="5"><?php echo $row['content'] ?></textarea>
      <input type="hidden" name="id" value="<?php echo $id ?>">
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
  </main>
</body>
</html>
