<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_GET['id'];
  $role = $_POST['role'];

  if(!$user || $user['role'] !== 'ADMIN') {
    header('Location: admin.php');
    die();
  }

  if(
    empty($_GET['id']) ||
    empty($_POST['role'])
  ) {
    die('資料不齊全');
  }

  $sql = 'update small_leaf_users set role=? where id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>