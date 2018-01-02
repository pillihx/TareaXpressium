<?php

//FUNCTION THAT CREATE AN SENTENCE FOR DELETED
//IN THE CASE SCHEMA : GENERATE BACKUP AND PASS ($CON, SCHEMA, SCHEMA_NAME) 

function buildDelete($type_delete,$object_delete){

	if($type_delete == "SCHEMA"){
		//buildBackup($object_delete); //GENERATE BACKUP
		executeQuery("DROP DATABASE IF EXISTS $object_delete"); //DELETE DATABASE
	}
	if($type_delete == "TABLE");
	if($type_delete == "COLUMN");
	if($type_delete == "ROW"){
		//SET OF VARIABLES
		$db_name = $object_delete['db_name'];
		$table_name = $object_delete['table_name'];
		$where_delete = $object_delete['where_delete'];

		$query_delete = "DELETE FROM $table_name WHERE ";
		//FILL VALUES WHERE
		end($where_delete);
		$last_key = key($where_delete);
		foreach ($where_delete as $key => $value) {
			$query_delete .= $key . "=" . ":" . $key;
			if($key != $last_key) $query_delete .= " AND ";
		}
		executeQuery("USE $db_name");
		return executeQuery($query_delete,$where_delete);
	}

}

?>