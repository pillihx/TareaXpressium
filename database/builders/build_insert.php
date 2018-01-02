<?php 

//FUNCTION THAT CREATE SENTENCES FOR INSERT A ROW IN A TABLE

function buildInsert($db_name,$table_name,$object_insert){

	$columns_query = "(";
	$values_query = "(";
	foreach ($object_insert as $column => $value) {
		$columns_query .= $column . ",";
		$values_query .= ":". $column . ",";
	}
	$columns_query = substr($columns_query,0,strlen($columns_query)-1) . ")";
	$values_query = substr($values_query,0,strlen($values_query)-1) . ")";

	executeQuery("USE $db_name");
	executeQuery("INSERT INTO $table_name $columns_query VALUES $values_query",$object_insert);

	$id_insert = $_SERVER["con"]->lastInsertId();
	buildSelect($db_name,$table_name,array("*"),array("id" => $id_insert));
}

?>