var states = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	state_name : 'VARCHAR(25) NOT NULL'
};
var tasks = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	task_name : 'VARCHAR(250) NOT NULL', 
	responsable : "VARCHAR(50) NOT NULL",
	date : 'DATE NOT NULL',
	last_observation : 'VARCHAR(500) NOT NULL',
	id_state : 'INT NOT NULL',
	FOREIGN : 'KEY (id_state) REFERENCES states(id)'
};
var seeds = {
	states : [
					{
						state_name : "Abierto"
					},
					{
						state_name : "Cerrado"
					},
					{
						state_name : "En proceso"
					},
					{
						state_name : "Anulado"
					},
					{
						state_name : "Fusionado"
					},
					{
						state_name : "Postergado"
					}
	]
};

var task_xpressium = {
	dbname : window.db_name,
	tables : {
				states : states,
				tasks : tasks
			 },
	seeds : seeds
};
