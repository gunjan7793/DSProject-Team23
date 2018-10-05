<?php

$client = new Client($_POST);

$client->create();

echo json_encode($client);
