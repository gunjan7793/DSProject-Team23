<?php

class ChartsData
{

    public $sensorDeployedId;
    public $date;
    public $output;
    public $heatRate;
    public $compressorEfficiency;
    public $availability;
    public $reliability;
    public $firedHours;
    public $trips;
    public $starts;

    public function __construct($row) {
      $this->sensorDeployedId = intval($row['sensorDeployedId']);
      $this->date = $row['date'];
      $this->output = doubleval($row['output']);
      $this->heatRate = doubleval($row['heatRate']);
      $this->compressorEfficiency = doubleval($row['compressorEfficiency']);
      $this->availability = doubleval($row['availability']);
      $this->reliability = doubleval($row['reliability']);
      $this->firedHours = doubleval($row['firedHours']);
      $this->trips = intval($row['trips']);
      $this->starts = intval($row['starts']);

    }

    public static function fetchByTurbineDeployedId(int $turbineDeployedId) {
        $db = new PDO(DB_SERVER, DB_USER, DB_PW);

        // $sql = 'SELECT DATE(dataCollectedDate) AS date, SUM(output) AS output, SUM(heatRate) AS heatRate,
        //         SUM(compressorEfficiency) AS compressorEfficiency, SUM(availability) AS availability,
        //         SUM(reliability) AS reliability, SUM(firedHours) AS firedHours, SUM(trips) AS trips,
        //         SUM(starts) AS starts
        //         FROM SensorTimeSeries AS sts, SensorDeployed AS sd
        //         WHERE sts.sensorDeployedId = sd.sensorDeployedId AND sd.turbineDeployedId = ?
        //         GROUP BY DATE(dataCollectedDate) ORDER BY date;';

        $sql = 'SELECT sd.sensorDeployedId, DATE(dataCollectedDate) AS date, output, heatRate, compressorEfficiency,
        availability, reliability, firedHours, trips, starts
        FROM SensorTimeSeries AS sts, SensorDeployed AS sd
        WHERE sts.sensorDeployedId = sd.sensorDeployedId AND sd.turbineDeployedId = ?
        ORDER BY date';

        $statement = $db->prepare($sql);

        $success = $statement->execute(
            [$turbineDeployedId]
        );

        if (!$success) {
          header('500 Server Error');
          print_r($statement->errorInfo());
          exit;
        }

        $arr = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
          $chartsDataItem =  new ChartsData($row);
          array_push($arr, $chartsDataItem);
        }

        return $arr;
      }
}
