<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');


  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
  }

  if($user === null || $user['role'] !== 'ADMIN') {
    header('Location: index.php');
    die();
  }

  $sql = 'select id, role, nickname, username from small_leaf_users order by id asc ';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }
  $result = $stmt->get_result();

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>後台管理</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="admin__board">
    <section>
      <table>
        <tr>
          <th>id</th>
          <th>nickname</th>
          <th>username</th>
          <th>身分調整</th>
        </tr>
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
        <tr>
          <td><?php echo escape($row['id']) ?></td>

          <td><?php echo escape($row['nickname']) ?></td>
          <td><?php echo escape($row['username']) ?></td>
          <td class="role">
            <form method="POST" action="handle_update_role.php?id=<?php echo escape($row['id']) ?>">
              <select name="role">
                <option value="ADMIN" <?php echo is_selected($row, 'ADMIN')?>>管理員</option>
                <option value="NORMAL" <?php echo is_selected($row, 'NORMAL')?>>一般會員</option>
                <option value="BANNED" <?php echo is_selected($row, 'BANNED')?>>停權會員</option>
              </select>
              <input type="submit">
            </form>
          </td>
        </tr>
        <?php } ?>
      </table>
      <div class="back">
        <a class="board__btn" href="index.php">首頁 </a>
      </div>
      
    </section>
  </main>
</body>
</html>