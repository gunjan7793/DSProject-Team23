<?php

require '../../app/common.php';
$clientId = intval($_GET['clientId'] ?? 0);
if ($clientId < 1) {
  throw new Exception('Invalid Client ID');
}

$siteAll = Site::findSiteFromClientId($clientId);

$json = json_encode($siteAll, JSON_PRETTY_PRINT);

header('Content-Type: application/json');

echo $json;
