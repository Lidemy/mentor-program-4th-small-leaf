<?php
  session_start();
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if(
    empty($username) ||
    empty($password)
  ) {
    header('Location: login.php?errCode=1');
    die();
  }

  $sql = 'select * from small_leaf_blog_users where username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    header('Location: login.php?errCode=2');
    die();
  }

  $row = $result->fetch_assoc();
  if(password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header('Location: login.php?errCode=2');
  }
?>