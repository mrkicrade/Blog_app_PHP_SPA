<?php 

require 'bootstrap.php';

$json = file_get_contents('php://input');

// var_dump($json);

$data = json_decode($json);

// var_dump($data);

$user->registerUser($data);


