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
  
  $user = getUserFromUsername($_SESSION['username']);
  $nickname =$user['nickname'];


  $content = $_POST['content'];

  $sql = 'insert into comments(nickname, content) values(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $content);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>