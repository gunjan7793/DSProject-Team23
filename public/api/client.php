<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientPost.php';
  exit;
}
// 1. Go to the database and get all work associated with the $taskId
$clientAll = Client::findAll();
// 2. Convert to JSON
$json = json_encode($clientAll, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
