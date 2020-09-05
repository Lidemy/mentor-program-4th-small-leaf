<?php
  session_start();
  require_once('conn.php');

  if(
    empty($_POST['nickname'])
  ) {
    header('Location: index.php');
    die();
  }
  
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  $sql = 'update small_leaf_users set nickname=? where username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>