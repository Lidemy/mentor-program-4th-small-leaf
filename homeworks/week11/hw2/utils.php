<?php
  require_once('conn.php');

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function  getPostByCategory($category_id){
    global $conn;
    $sql = 'select p.id as id, p.title as title, p.content as content, p.created_at as created_at, c.name from small_leaf_blog_posts as p left join small_leaf_blog_categories as c on p.category_id = c.id where p.is_deleted is null and p.category_id=? order by p.id desc';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $category_id);
    $result = $stmt->execute();
    if(!$result) {
    die('Error' . $conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function hasPostsCount($category_id) {
    global $conn;
    $sql = 'select count(p.id) as count from small_leaf_blog_posts as p left join small_leaf_blog_categories as c on p.category_id = c.id where p.is_deleted is null and p.category_id=?';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $category_id);
    $result = $stmt->execute();
    if(!$result) {
    die('Error' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'];
  }


  function getCategory() {
    global $conn;
    $sql = 'select * from small_leaf_blog_categories order by id asc';

    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    if(!$result) {
    die('Error' . $conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function getPostCount() {
    global $conn;
    $sql ='select count(id) as count from small_leaf_blog_posts where is_deleted is null';
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    return $count;
  }
?>