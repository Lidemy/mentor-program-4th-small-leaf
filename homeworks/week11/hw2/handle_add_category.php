<?php 
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');

  $name = $_POST['name'];
  
  if(
    empty($name)
  ) {
    header('Location: add_category.php?errCode=1');
    die();
  }

  $sql = 'insert into small_leaf_blog_categories(name) values(?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $name);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  }

  header('Location: admin_category.php');
?>