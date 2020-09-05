<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(
    empty($_POST['content'])
  ) {
    header('Location: update_comment.php?errCode=1&id='.$_POST['id'].'&page='.$_GET['page']);
    die();
  }
  $page = $_GET['page'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_POST['id'];
  $content = $_POST['content'];


  if(isAdmin($user)) {
    $sql = 'update small_leaf_comments set content=? where id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = 'update small_leaf_comments set content=? where id=? and username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }
  
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php?page=' . $page);
?>