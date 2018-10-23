<?php

require '../../app/common.php';

$sensorTimeAll = SensorTimeSeries::findAll();

$json = json_encode($sensorTimeAll, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
