<?php
class Client
{
  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarters;

  public function __construct($row) {
    $this->clientId = isset($row['clientId']) ? intval($row['clientId']) : null;
    $this->clientName = $row['clientName'];
    $this->clientDescription = $row['clientDescription'];
    $this->gicsSector = $row['gicsSector'];
    $this->gicsSubIndustry = $row['gicsSubIndustry'];
    $this->headquarters = $row['headquarters'];
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO Client (clientId, clientName, clientDescription, gicsSector, gicsSubIndustry, headquarters)
            VALUES (?,?,?,?,?,?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->clientId,
      $this->clientName,
      $this->clientDescription,
      $this->gicsSector,
      $this->gicsSubIndustry,
      $this->headquarters
    ]);

    if(!$success){
      die('Error in SQL Client Insert Statement');
    }
  }

  public static function findAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM Client';
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
