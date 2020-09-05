<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $sql = 'select * from small_leaf_blog_categories where is_deleted is null order by id asc';

  $stmt = $conn->prepare($sql);
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
            <li><a href="add_category.php">新增分類</a></li>
            <li><a href="admin.php">管理文章</a></li>
            <li><a href="logout.php">登出</a></li>
          <?php } else { ?>
            <li><a href="login.php">登入</a></li>
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
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
        <?php
          while($row = $result->fetch_assoc()) { 
            $count = hasPostsCount(escape($row['id']));
        ?>
        <div class="admin-post">
          <div class="admin-post__title">
            <?php echo escape($row['name'])?> ( <?php echo $count ?> )
          </div>
          <div class="admin-post__info">
            <div class="admin-post__created-at">
              <?php echo escape($row['created_at']) ?>
            </div>
            <a class="admin-post__btn" href="edit_category.php?id=<?php echo escape($row['id']) ?>">
              編輯
            </a>
            <a class="admin-post__btn" href="handle_delete_category.php?id=<?php echo escape($row['id']) ?>">
              刪除
            </a>
          </div>
        </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <div class="show-error">
    <?php if(!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';
      if($code === '1') {
        $msg = '錯誤：資料不齊全';
      } else if($code === '2') {
        $msg = '錯誤：該分類內還有文章';
      }
      echo '<span>' . $msg . '</span>';
    } ?>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>