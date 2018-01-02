<?php

require("connect.php");
require("execute_query.php");
require("builders/build_select.php");
require("builders/build_schema.php");
require("builders/build_create.php");
require("builders/build_delete.php");
require("builders/build_backup.php");
require("builders/build_insert.php");
require("builders/build_update.php");


$type_request = $_POST["type_request"];

if($type_request == "schema")
	buildSchema($_POST["modelDB"],$_POST["pass_secret"]);

if($type_request == "create")
	buildCreate($_POST["type_create"],$_POST["object_create"]);

if($type_request == "insert")
	buildInsert($_POST["db_name"],$_POST["table_name"],$_POST["object_insert"]);

if($type_request == "delete")
	buildDelete($_POST["type_delete"],$_POST["object_delete"]);

if($type_request == "backup")
	buildBackup($_POST["db_name"],$_POST["tables"]);

if($type_request == "select")
	buildSelect($_POST["db_name"],$_POST["table_name"],$_POST["columns"],$_POST["where_select"]);

if($type_request == "update")
	buildUpdate($_POST["db_name"],$_POST["table_name"],$_POST["columns_update"],$_POST["where_update"]);


//CLOSE CONNECTION PDO
$_SERVER["con"]=null;
//CLOSE CONNECTION MYSQLI
$_SERVER["con_mysqli"]=null;

?>