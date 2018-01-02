<?php
//FUNCTION THAT CREATE A QUERY, WHERE PARAMS IS LIKE ['s'=>'param1','s'=>'param2']
//BUILD MESSAGE WITH DATETIME 
function executeQuery($query,$params=null){

	echo json_encode(array("terminal" => array("content" => $query, "date" => date('Y-m-d H:i:s')))) . "\n";

	if($params != null){ 
		try{
			$stmt=$_SERVER["con"]->prepare($query);

			if($params == "*")//GET WITHOUT WHERE
				$stmt->execute();
			else// GET WITH WHERE
				$stmt->execute($params);

			if(explode(" ", $query)[0] == "SELECT"){ //SI LA CONSULTA ES DE TIPO SELECT, ESTE SERA EL ÚNICO RESULT QUE RESPONDERÁ EL SERVER
				$result=$stmt->fetchAll(PDO::FETCH_ASSOC);

				if(count($result) == 0)
					echo json_encode(array("result" => array("content" => null, "date" => date('Y-m-d H:i:s')))) . "\n";
				if(count($result) == 1 && $params == "*")
					echo json_encode(array("result" => array("content" => $result, "date" => date('Y-m-d H:i:s')))) . "\n";
				if(count($result) == 1)
					echo json_encode(array("result" => array("content" => $result[0], "date" => date('Y-m-d H:i:s')))) . "\n";
				if(count($result) > 1)
					echo json_encode(array("result" => array("content" => $result, "date" => date('Y-m-d H:i:s')))) . "\n";

			}
		}
		catch(PDOException $e){
			echo json_encode(array("error" => $e->getMessage())) . "\n";
		}
	}
	else{
		try {
			$result = $_SERVER["con"]->query($query);
			//echo json_encode(array("result" => array("content" => $result, "date" => date('Y-m-d H:i:s')))) . "\n";
		} catch (PDOException $e) {
			echo json_encode(array("error" => array("content" => $e->getMessage(), "date" => date('Y-m-d H:i:s')))) . "\n";
		}
	}			
}
?>