<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');
  require_once('utils.php');
  
  $id = $_GET['id'];
  
  if(empty($id)) {
    header('Location: admin.php');
    die();
  }

  $sql = 'update small_leaf_blog_posts set is_deleted=1 where id=?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
  die('Error' . $conn->error);
  }

  header('Location: admin.php');

?>