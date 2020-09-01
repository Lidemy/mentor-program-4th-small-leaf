<?php 
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');

  $title = $_POST['title'];
  $content = $_POST['content'];
  $username = $_SESSION['username'];
  $category_id = $_POST['category_id'];
  
  if(
    empty($title) ||
    empty($content) ||
    empty($category_id)
  ) {
    header('Location: add_post.php?errCode=1');
    die();
  }

  $sql = 'insert into small_leaf_blog_posts(username, title, content, category_id) values(?, ?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssi', $username, $title, $content, $category_id);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>