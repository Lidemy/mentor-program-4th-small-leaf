<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(
    empty($_GET['id'])
  ) {
    header('Location: index.php?errCode=1&page='.$_GET['page']);
    die();
  }
  
  $id = $_GET['id'];
  $page = $_GET['page'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if(isAdmin($user)) {
    $sql = 'update small_leaf_comments set is_deleted=1 where id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = 'update small_leaf_comments set is_deleted=1 where id=? and username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }
  
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php?page='. $page);
?>