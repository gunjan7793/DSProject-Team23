<?php

class ChartsData
{
  public static function fetchByTurbineDeployedId(int $turbineDeployedId) {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    $sql = 'SELECT DATE(dataCollectedDate) AS date, SUM(output) AS output
            FROM SensorTimeSeries AS sts, SensorDeployed AS sd
            WHERE sts.sensorDeployedId = sd.sensorDeployedId AND sd.turbineDeployedId = ?
            GROUP BY DATE(dataCollectedDate) ORDER BY date;';

    $statement = $db->prepare($sql);

    $success = $statement->execute(
        [$turbineDeployedId]
    );

    if (!$success) {
      header('500 Server Error');
      print_r($statement->errorInfo());
      exit;
    }

    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
