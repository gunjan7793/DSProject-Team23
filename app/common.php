<?php

<<<<<<< HEAD
=======
require 'environment.php';
// Change the working directory to this file.
chdir(__DIR__);
set_include_path (__DIR__);
>>>>>>> e72908b9bd3e3afd46a53a78d1abc8cad9432676
// Change the working directory to this file.
chdir(__DIR__);
set_include_path (__DIR__);

if ($_SERVER['REQUEST_METHOD'] == 'POST'
&& stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== false ) {
  $_POST = json_decode(file_get_contents('php://input'), true);
}


/** MODELS **/
require 'models/Client.php';
require 'models/Site.php';
require 'models/Turbine.php';
require 'models/TurbineDeployed.php';
require 'models/Sensor.php';
require 'models/SensorDeployed.php';
require 'models/SensorTimeSeries.php';
