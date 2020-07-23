<?php 

require 'bootstrap.php';

echo json_encode($query->selectAll('posts', 'users'));

// echo json_encode($query->getAll('posts'));
