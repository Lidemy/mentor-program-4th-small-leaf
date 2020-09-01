<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');
  require_once('utils.php');

  
  $id = $_POST['id'];
  $name = $_POST['name'];
  $lastPage = $_POST['lastPage'];
  
  if(
    empty($name)
  ) {
    header('Location: edit_category.php?id='. $id.'&errCode=1');
    die();
  }

  $sql = 'update small_leaf_blog_categories set name=? where id=?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $name, $id);
  $result = $stmt->execute();
  if(!$result) {
  die('Error' . $conn->error);
  }

  header('Location:'. $lastPage);

?>