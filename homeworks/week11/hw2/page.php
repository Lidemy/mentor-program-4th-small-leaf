<div class="page-info">
  <span>共 <?php echo  $count ?> 筆 - 頁數：</span>
  <span><?php echo $page ?> / <?php echo $total_page ?></span>
  <div class="paginator">
  <?php
    if(empty($category_id)) {
      if($page != 1) { 
    ?>
      <a href="index.php?page=1">首頁</a>
      <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
    <?php } ?>
    <?php if($page != $total_page) { ?>
      <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
      <a href="index.php?page=<?php echo $total_page ?>">末頁</a>
    <?php }} ?>
    <?php
    if(!empty($category_id)) {
      if($page != 1) { 
    ?>
      <a href="category.php?category_id=<?php echo $category_id ?>&page=1">首頁</a>
      <a href="category.php?category_id=<?php echo $category_id ?>&page=<?php echo $page - 1 ?>">上一頁</a>
    <?php } ?>
    <?php if($page != $total_page) { ?>
      <a href="category.php?category_id=<?php echo $category_id ?>&page=<?php echo $page + 1 ?>">下一頁</a>
      <a href="category.php?category_id=<?php echo $category_id ?>&page=<?php echo $total_page ?>">末頁</a>
    <?php }} ?>
  </div>
 </div>