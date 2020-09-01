<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');
  require_once('utils.php');

  
  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  $category_id = $_POST['category_id'];
  $lastPage = $_POST['lastPage'];
  
  if(
    empty($id) ||
    empty($title) ||
    empty($content) ||
    empty($category_id)
  ) {
    header('Location: edit.php?id='. $id.'&errCode=1');
    die();
  }

  $sql = 'update small_leaf_blog_posts set title=?, content=?, category_id=? where id=?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssii', $title, $content, $category_id, $id);
  $result = $stmt->execute();
  if(!$result) {
  die('Error' . $conn->error);
  }

  header('Location:'. $lastPage);

?>