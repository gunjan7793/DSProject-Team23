<?php



class SensorTimeSeries
{
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;

  public function __construct($row) {
    $this->sensorDeployedId = isset($row['sensorDeployedId']) ? intval($row['sensorDeployedId']) : null;
    $this->dataCollectedDate = $row['dataCollectedDate'];
    $this->output = doubleval($row['output']);
    $this->heatRate = doubleval($row['heatRate']);
    $this->compressorEfficiency = doubleval($row['compressorEfficiency']);
    $this->availability = doubleval($row['availability']);
    $this->reliability = doubleval($row['reliability']);
    $this->firedHours = doubleval($row['firedHours']);
    $this->trips = intval($row['trips']);
  }

  public static function findAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM SensorTimeSeries';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $sensortimeItem =  new SensorTimeSeries($row);
      array_push($arr, $sensortimeItem);
    }
    return $arr;
  }
  public static function findTotalFiredHours() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT SUM(firedHours) FROM SensorTimeSeries';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $clientItem =  new Client($row);
      array_push($arr, $clientItem);
    }
    return $arr;
  }
}
