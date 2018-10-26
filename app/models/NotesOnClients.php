<?php

class NotesOnClients
{
    public $notesId;
    public $clientId;
    public $notes;

    public function __construct($row)
    {
        $this->notesId = isset($row['notesId']) ? intval($row['notesId']) : null;
        $this->clientId = intval($row['clientId']);
        $this->notes = $row['notes'];
    }

    public function create()
    {
        // 1. Connect to the database
        $db = new PDO(DB_SERVER, DB_USER, DB_PW);
        // 2. Prepare the query
        $sql = 'INSERT INTO NotesOnClients(clientId,notes) VALUES(?,?)';
        $statement = $db->prepare($sql);
        // 3. Run the query
        $success = $statement->execute([
            $this->clientId,
            $this->notes
        ]);
        if (!$success) {
            // TODO: Better error handling
            die('SQL error in Client Notes Post');
        }
        $this->clientNotesId = $db->lastInsertId();
    }

    public static function findByClientId(int $clientId)
    {
        // 1. Connect to the database
        $db = new PDO(DB_SERVER, DB_USER, DB_PW);
        // 2. Prepare the query
        $sql = 'SELECT * FROM NotesOnClients WHERE clientId=?';
        $statement = $db->prepare($sql);
        // 3. Run the query
        $success = $statement->execute([$clientId]);
        // 4. Handle the results
        $arr = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $clientNotesItem = new NotesOnClients($row);
            array_push($arr, $clientNotesItem);
        }
        return $arr;
    }
}
