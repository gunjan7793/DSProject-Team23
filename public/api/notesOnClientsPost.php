<?php

$client = new NotesOnClients($_POST);

$client->create();

echo json_encode($client);
