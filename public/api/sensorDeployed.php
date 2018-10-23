<?php

require '../../app/common.php';

$sensorDeployedAll = SensorDeployed::findAll();

$json = json_encode($sensorDeployedAll, JSON_PRETTY_PRINT);

header('Content-Type: application/json');

echo $json;
