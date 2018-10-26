<?php
class TurbineAndTurbineDeployed
{
  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;


  public function __construct($row) {
    $this->turbineDeployedId = isset($row['turbineDeployedId']) ? intval($row['turbineDeployedId']) : null;
    $this->turbineId = intval($row['turbineId']);
    $this->siteId = intval($row['siteId']);
    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
    $this->totalFiredHours = intval($row['totalFiredHours']);
    $this->totalStarts = intval($row['totalStarts']);
    $this->lastPlannedOutageDate = $row['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $row['lastUnplannedOutageDate'];
    $this->turbineName = $row['turbineName'];
    $this->turbineDescription = $row['turbineDescription'];
    $this->capacity = intval($row['capacity']);
    $this->rampUpTime = intval($row['rampUpTime']);
    $this->maintenanceInterval = intval($row['maintenanceInterval']);

  }

  public static function findTurbineDetailsFromSiteId(int $siteId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM Turbine AS t, TurbineDeployed AS tb WHERE t.turbineId = tb.turbineId AND siteId = ?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute([$siteId]);
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $turbineandTurbineDeployedItem =  new TurbineAndTurbineDeployed($row);
      array_push($arr, $turbineandTurbineDeployedItem);
    }
    return $arr;
  }
}
