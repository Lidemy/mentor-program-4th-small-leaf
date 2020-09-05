<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(
    empty($_POST['content'])
  ) {
    header('Location: index.php?errCode=1');
    die();
  }
  
  $username =$_SESSION['username'];
  $user = getUserFromUsername($username);
  $content = $_POST['content'];

  if(!hasPermission($user, 'create', null)) {
    header('Location: index.php');
    die();
  }

  $sql = 'insert into small_leaf_comments(username, content) values(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>