<?php

require '../../app/common.php';
$siteId = intval($_GET['siteId'] ?? 0);
if ($clientId < 1) {
  throw new Exception('Invalid Site ID');
}
$turbineId = intval($_GET['turbineId'] ?? 0);
if ($turbineId < 1) {
  throw new Exception('Invalid Turbine ID');
}

// 1. Go to the database and get all work associated with the $taskId
$turbineDeployAll = TurbineDeployed::findTurbineFromSiteTurbineId([$siteId],[$turbineId]);
// 2. Convert to JSON
$json = json_encode($turbineDeployAll, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
