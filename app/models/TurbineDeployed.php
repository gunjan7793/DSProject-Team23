<?php
class TurbineDeployed
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
  }

  public static function findAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM TurbineDeployed';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $turbineDeployedItem =  new TurbineDeployed($row);
      array_push($arr, $turbineDeployedItem);
    }
    return $arr;
  }

  public static function findTurbineFromSiteTurbineId(int $siteId, int $turbineId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM TurbineDeployed WHERE siteId = ? AND turbineId = ?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute([$siteId],[$turbineId]);
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $turbineDeployedItem =  new TurbineDeployed($row);
      array_push($arr, $turbineDeployedItem);
    }
    return $arr;
  }

  public static function findTurbinesDeployed() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT s.siteName AS siteName, COUNT(td.turbineId) AS noOfTurbines, t.turbineName AS turbineName
            FROM TurbineDeployed AS td, Site AS s, Turbine AS t
            WHERE td.siteId = s.siteId AND td.turbineId = t.turbineId GROUP BY td.siteId;';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute([$siteId],[$turbineId]);
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $turbineDeployedItem =  new TurbineDeployed($row);
      array_push($arr, $turbineDeployedItem);
    }
    return $arr;
  }

}
