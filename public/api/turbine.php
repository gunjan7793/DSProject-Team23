<?php

require '../../app/common.php';

$turbineAll = Turbine::findAll();

$json = json_encode($turbineAll, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
