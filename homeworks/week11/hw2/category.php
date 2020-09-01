<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = null;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  
  $category_id = $_GET['category_id'];

  if(empty($category_id)) {
    header('Location: category_list.php?errCode=1');
    die();
  }

  $count = hasPostsCount($category_id);
  if($count <= 0) {
    header('Location: category_list.php?errCode=2');
    die();
  }

  $page = 1;
	if(!empty($_GET['page'])) {
		$page = intval($_GET['page']);
  }
  
  $limit = 5;
  $offset = ($page - 1) * $limit;
  $total_page = ceil($count / $limit);

  $sql = 'select p.id as id, p.title as title, p.content as content, p.created_at as created_at, c.name as name, c.id as category_id from small_leaf_blog_categories as c left join small_leaf_blog_posts as p on c.id = p.category_id  where category_id=? order by p.id desc limit ? offset ?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iii', $category_id, $limit, $offset);
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
            <li><a href="admin.php">管理文章</a></li>
            <li><a href="admin_category.php">管理分類</a></li>
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
    <div class="posts">
    <?php while($row = $result->fetch_assoc()) { ?>
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']) ?></div>
          <div class="post__actions">
            <?php if(!empty($username)) { ?>
            <a class="post__action" href="edit.php?id=<?php echo escape($row['id']) ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['created_at']) ?>
          <div>
              <a class='category' href="category.php?category_id=<?php echo escape($row['category_id']) ?>">
                [<?php echo escape($row['name']) ?>]
              </a>
          </div>
        </div>
        <div class="post__content">
          <?php echo mb_substr((escape($row['content'])), 0, 200) ?>
        </div>
        <a class="btn-read-more" href="post.php?id=<?php echo escape($row['id']) ?>">READ MORE</a>
      </article>
    <?php } ?>
    </div>
  </div>
  <?php include_once('page.php') ?>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>