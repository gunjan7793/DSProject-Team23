<?php

require '../../app/common.php';
$siteId = intval($_GET['siteId'] ?? 0);
if ($siteId < 1) {
  throw new Exception('Invalid Site ID');
}


$turbinesDeployed = TurbineDeployed::findTurbineFromSiteId($siteId);

$json = json_encode($turbinesDeployed, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
