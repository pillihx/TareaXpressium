<?php
//FUNCTION THAT BUILD A SENTENCES SELECT IN MYSQL
//PASSING DB_NAME LIKE NAME DATABASE, TABLE_NAME, COLUMNS FOR GET AND WHERE_SELECT THAT IS VALUES SELECTED

function buildSelect($db_name,$table_name,$columns,$where_select){

	$query_select = "SELECT ";
	//FILL COLUMNS FOR GET
	foreach ($columns as $c) {
		$query_select .= $c;
		if(array_search($c,$columns) != count($columns) - 1) $query_select .= ",";
	}
	if($where_select != "*"){//GET 
		//INTERMEDIATE
		$query_select .= " FROM $db_name.$table_name WHERE ";
		//FILL VALUES WHERE
		end($where_select);
		$last_key = key($where_select);
		foreach ($where_select as $key => $value) {
			$query_select .= $key . "=" . ":" . $key;
			if($key != $last_key) $query_select .= " AND ";
		}
		executeQuery("USE $db_name");
		return executeQuery($query_select,$where_select);
	}
	else{//GET ALL SELECT
		//INTERMEDIATE
		$query_select .= " FROM $db_name.$table_name";
		executeQuery("USE $db_name");
		return executeQuery($query_select,"*");
	}

}
?>