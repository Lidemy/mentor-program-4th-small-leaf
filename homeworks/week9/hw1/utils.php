<?php
  require_once('conn.php');

  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
      'select * from small_leaf_users where username="%s"',
      $username
    );
    $result = $conn->query($sql);
    if(!$result) {
      die($conn->error);
    }
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>
