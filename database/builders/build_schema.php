<?php 

//FUNCTION THAT BUILD A SENTENCES SCHEMA IN MYSQL
//THIS FUNCTION ERASES THE OLD SCHEME AND PUTS THE NEW GENERATED SCHEMA WITH NEW TABLES AND NEW SEEDS

function buildSchema($modelDB,$pass_secret){
	if($pass_secret == "pilli"){
		//ERASE THE OLD SCHEMA AND GENERATE BACKUP THE OLD SCHEMA
		buildDelete("SCHEMA",$modelDB["dbname"]);
		//CREATE THE NEW SCHEMA
		buildCreate("SCHEMA",$modelDB["dbname"]);
		//CREATE TABLES
		foreach ($modelDB["tables"] as $key => $value) {
			buildCreate("TABLE",[$modelDB["dbname"],$key,$value]);
		}
		//INSERT SEEDS
		foreach ($modelDB["seeds"] as $key => $value) {
			for($i = 0 ; $i < count($value) ; $i++)
				buildInsert($modelDB["dbname"],$key,$value[$i]);
		}
		echo json_encode(array("result" => array("content" => "Se reestablecido la Base de Datos", "date" => date('Y-m-d H:i:s')))) . "\n";
	}
	else{
		echo json_encode(array("error" => array("content" => "La clave secreta no es valida", "date" => date('Y-m-d H:i:s')))) . "\n";
	}
}
?>