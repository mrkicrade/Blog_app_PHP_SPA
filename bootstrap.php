<?php 

session_start();

$config = require 'config.php';
$database = $config['database'];

require 'classes/Connection.php';

$db = Connection::connect($database);

require 'classes/QueryBuilder.php';
require 'classes/User.php';
require 'classes/Post.php';

$query = new QueryBuilder($db);
$user = new User($db);
$post = new Post($db);