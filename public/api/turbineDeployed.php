<?php

require '../../app/common.php';
$siteId = intval($_GET['siteId'] ?? 0);
if ($siteId < 1) {
  throw new Exception('Invalid Site ID');
}
// $turbineId = intval($_GET['turbineId'] ?? 0);
// if ($turbineId < 1) {
//   throw new Exception('Invalid Turbine ID');
// }
// $turbineDeployAll = TurbineDeployed::findTurbineFromSiteTurbineId([$siteId],[$turbineId]);
//
// $json = json_encode($turbineDeployAll, JSON_PRETTY_PRINT);
//
// header('Content-Type: application/json');
// echo $json;

$turbinesDeployed = TurbineDeployed::findTurbineFromSiteId($siteId);

$json = json_encode($turbinesDeployed, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
