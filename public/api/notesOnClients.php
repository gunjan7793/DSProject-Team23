<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'notesOnClientsPost.php';
  exit;
}
$clientId = intval($_GET['clientId']);

if ($clientId < 1) {
  throw new Exception('Invalid Client ID');
}
// 1. Go to the database and get all work associated with the $taskId
$clientNotesAll = NotesOnClients::findByClientId($clientId);

// 2. Convert to JSON
$json = json_encode($clientNotesAll, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
