<?php

$username = "root";
$pass = "";
$server = "localhost";


$_SERVER["con_mysqli"] = mysqli_connect($server,$username,$pass);
mysqli_set_charset($_SERVER["con_mysqli"], 'utf8');//Permite los acentos dentro de la BD
if (mysqli_connect_error()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$_SERVER["con"] = new PDO("mysql:host=$server", $username, $pass);
// set the PDO error mode to exception
$_SERVER["con"]->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


?>