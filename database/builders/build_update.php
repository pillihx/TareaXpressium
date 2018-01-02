<?php 

function buildUpdate($db_name,$table_name,$columns_update,$where_update){
	$query_update = "UPDATE $db_name.$table_name SET ";
	//FILL COLUMNS FOR UPDATE
	end($columns_update);
	$last_key = key($columns_update);
	foreach ($columns_update as $key => $value) {
		$query_update .= $key . "=" . ":" . $key;
		if($key != $last_key) $query_update .= " , ";
	}
	//INTERMEDIATE
	$query_update .= " WHERE ";
	//FILL VALUES WHERE
	end($where_update);
	$last_key = key($where_update);
	foreach ($where_update as $key => $value) {
		$query_update .= $key . "=" . ":" . $key;
		if($key != $last_key) $query_update .= " AND ";
	}
	executeQuery("USE $db_name");
	return executeQuery($query_update,array_merge($columns_update,$where_update));
}

?>