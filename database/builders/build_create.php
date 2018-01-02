<?php

//FUNCTION THAT BUILD A SENTENCES CREATE IN MYSQL
//IN THE CASE THAT IS SCHEMA, ONLY PASS SCHAME_NAME
//IN THE CASE THAT IS TABLA, PASS [SCHEMA_NAME,TABLE_NAME,COLUMNS]
//IN THE CASE THAT IS COLUMN, PASS LIKE OBJECT_CREATE THE FOLLOW STRUCT [SCHEMA_NAME,TABLE_NAME,COLUMN_NAME,PROPERTY_COLUMN]

function buildCreate($type_create,$object_create){

	if($type_create == "SCHEMA"){
		executeQuery("CREATE DATABASE IF NOT EXISTS $object_create"); //IF NOT EXISTS IS DATABASE, THAT CREATE
		executeQuery("USE $object_create");
	}
	if($type_create == "TABLE"){ 
		executeQuery("USE $object_create[0]");
		$query_create_table = "CREATE TABLE IF NOT EXISTS $object_create[1] (";
		$c = 0;
		foreach ($object_create[2] as $key => $value) {
			if($c == 0){ //SE CREA LA TABLA CON LA PRIMERA COLUMNA
				$query_create_table = $query_create_table.$key." ".$value.")";
				executeQuery($query_create_table);
			}
			else  //EN EL CASO QUE NO SEA LA PRIMERA COLUMNA SE VAN AÑADIENDO A LA TABLA
				buildCreate("COLUMN",[$object_create[0],$object_create[1],$key,$value]);
			$c = $c + 1;
		}
	}
	if($type_create == "COLUMN"){
		executeQuery("USE $object_create[0]");
		$column = executeQuery("SELECT $object_create[2] FROM $object_create[1]"); //VERIFY IF COLUMN EXIST
		if (!$column)
			executeQuery("ALTER TABLE $object_create[1] ADD $object_create[2] $object_create[3]"); //IF NOT EXISTS THAT CREATE
	}
}
