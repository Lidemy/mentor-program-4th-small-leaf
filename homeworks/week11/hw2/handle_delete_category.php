<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');
  require_once('utils.php');
  
  $id = $_GET['id'];
  
  if(empty($id)) {
    header('Location: admin_category.php?errCode=1');
    die();
  }

  $count = hasPostsCount($id);
  if($count > 0) {
    header('Location: admin_category.php?errCode=2');
    die();
  }

  $sql = 'update small_leaf_blog_categories set is_deleted=1 where id=?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
  die('Error' . $conn->error);
  }

  header('Location: admin_category.php');

?>