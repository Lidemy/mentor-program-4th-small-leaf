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
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
  }

	$page = 1;
	if(!empty($_GET['page'])) {
		$page = intval($_GET['page']);
	}
  $limit = 10;
  $offset = ($page - 1) * $limit;

  $sql = 'select '.
            'c.id as id, c.content as content, c.created_at as created_at, u.nickname as nickname, u.username as username '.
          'from small_leaf_comments as c '.
          'left join small_leaf_users as u '.
          'on c.username = u.username '.
          'where c.is_deleted is null '.
          'order by c.id desc '.
          'limit ? offset ?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit, $offset);
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
          <?php if($user && $user['role'] === 'ADMIN') { ?>
            <a class="board__btn" href="admin.php">後台管理</a>
          <?php } ?>
          <a class="update-nickname-btn">編輯暱稱</a>
          <a class="board__btn" href="logout.php">登出</a>
        <?php } ?>
      </div>
    </div>
    <div class="fixed-block hide">
			<form class="update-form" method="POST" action="handle_update_nickname.php" >
				<h2>編輯暱稱</h2>
				<div class="update-nickname">
					<div class="cancel">×</div>
					<label>新暱稱：</label>
					<input class="board__nickname-update" name="nickname" type="text">
					<div><input class="update-btn"  type="submit" ></div>
      	</div>
			</form>
		</div>
     <div class="greet">
      <?php if(!empty($nickname)) { ?>
          <h3>你好！ <?php echo escape($nickname); ?></h3>
        <?php } ?>
     </div>
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
        <?php if($username && !hasPermission($user, 'create', null)) { ?>
          <h3>你已被停權</h3>
        <?php } else if($username) { ?>
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
        <div class="card__main">
          <div class="card__info">
            <span class="card__author">
              <?php echo escape($row['nickname']) ?>
              (@<?php echo escape($row['username']) ?>)
            </span>
            <span class="card__time">
            <?php echo escape($row['created_at']) ?>
            </span>
            <div>
              <span class="card__content">
                <?php echo escape($row['content']) ?>
              </sapn>
            </div>
          </div>
          <div class="edit-comment" >
            <div>
            <?php 
              if(!empty($username && $row['username'])) { 
                if(isAdmin($user) || $user['username'] === $row['username']) {
            ?>
              <a class="edit" href="update_comment.php?id=<?php echo $row['id'] ?>&page=<?php echo $page ?>">編輯</a>
              <a class="delete" href="handle_delete_comment.php?id=<?php echo $row['id'] ?>&page=<?php echo $page?>">刪除</a>   
            <?php }} ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <?php } ?>
  </section>
  <hr>
  <?php
    $sql ='select count(id) as count from small_leaf_comments where is_deleted is null';
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil($count / $limit);
  ?>
  <div class="page-info">
    <span>共 <?php echo  $count ?> 筆 - 頁數：</span>
    <span><?php echo $page ?> / <?php echo $total_page ?></span>
    <div class="paginator">
			<?php if($page != 1) { ?>
				<a href="index.php?page=1">首頁</a>
				<a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
			<?php } ?>
			<?php if($page != $total_page) { ?>
				<a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
				<a href="index.php?page=<?php echo $total_page ?>">末頁</a>
			<?php } ?>
    </div>
  </div>
  </main>
	<script src="./index.js"></script>
</body>
</html>
