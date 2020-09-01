<?php
  require_once('conn.php');

  function getUserFromUsername($username) {
    global $conn;
    $sql = 'select * from small_leaf_users where username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$username);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  // $action: update, delete, create
  function hasPermission($user, $action, $row) {
    if($user['role'] === 'ADMIN') {
      return true;
    }

    if($user['role'] === 'NORMAL') {
      if($action === 'create') {
        return true;
      }
      return $row['username'] === $user['username'];
    }

    if($user['role'] === 'BANNED') {
      return $action !== 'create';
    }

  }

  function isAdmin($user) {
    return $user['role'] === 'ADMIN';
  }


  function is_selected($row, $role){
    if ($row['role'] === $role) {
      return 'selected';
    }
  }
?>