<?php
require '../../app/common.php';

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);

if ($projectId < 1) {
  throw new Exception('Invalid Turbine Deployed ID');
}

// 1. Go to the database and get all work associated with the $taskId
$dataArr = ChartsData::fetchByTurbineDeployedId($turbineDeployedId);

// 2. Convert to JSON
$json = json_encode($dataArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
