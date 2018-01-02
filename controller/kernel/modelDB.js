var users = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	username : 'VARCHAR(25) NOT NULL', 
	name : "VARCHAR(25) NOT NULL",
	pass : 'VARCHAR(50) NOT NULL',
	email : 'VARCHAR(50) NOT NULL',
	image_profile : 'VARCHAR(500) NULL',
	position : 'VARCHAR(25) NOT NULL'
};
var wastes = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	weight : 'INT NOT NULL',
	type : 'VARCHAR(25)',
	client : 'VARCHAR(25)',
	date : 'VARCHAR(25)',
	month : 'VARCHAR(7)'
};
var sessions = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	id_user : 'INT NOT NULL',
	created_at : 'DATETIME NOT NULL',
	deleted_at : "DATETIME DEFAULT '0000-00-00 00:00:00'",
	ip_device : 'VARCHAR(30) NOT NULL',
	user_agent : 'VARCHAR(200) NOT NULL'
};
var notifications = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	id_session : 'INT NOT NULL',
	text : 'VARCHAR(50) NOT NULL',
	created_at : 'TIMESTAMP NOT NULL'
};
var messages = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	type : 'VARCHAR(100) NOT NULL',
	body : 'VARCHAR(1000) NOT NULL'
};
var phones = {
	id : 'INT PRIMARY KEY AUTO_INCREMENT NOT NULL',
	name : 'VARCHAR(25) NOT NULL',
	number : 'VARCHAR(25) NOT NULL',
	day : 'VARCHAR(25) NOT NULL'
};
var seeds = {
	users : [
				{
					username : "cherrera",
					pass : hashPass("pass"),
					name : "Catalina H",
					email : "catalina@reuso.cl",
					position : "Gerente General",
					image_profile : "http://www.reuso.cl/wp-content/uploads/2017/07/Catalina-Herrera.jpg"
				},
				{
					username : "adiaz",
					pass : hashPass("pass"),
					name : "Alejandra D",
					email : "alejandra@reuso.cl",
					position : "Gerente de Operaciones",
					image_profile : "http://www.reuso.cl/wp-content/uploads/2017/07/Alejandra-Díaz-e1500064118656.jpg"
				},
				{
					username : "jmiranda",
					pass : hashPass("soyunweonx2"),
					name : "Jose M.",
					email : "jose.miranda.13@sansano.usm.cl",
					position : "Webmaster",
					image_profile : "http://www.reuso.cl/wp-content/uploads/2017/07/IMG_5067.jpg"
				}
			],
	messages : 	[
				{
					type : "Mensaje enviado los lunes:",
					body : "Hola, buen día!! Recuerden que mañana martes pasaremos retirando sus residuos orgánicos en el mismo horario de siempre. Muchas gracias y buena semana!"
				},
				{
					type : "Mensaje enviado los jueves:",
					body : "Hola, buen día!! Recuerden que mañana viernes pasaremos retirando sus residuos orgánicos en el mismo horario de siempre. Muchas gracias y buen fin de semana!"
				},
				{
					type : "Mensaje con cobro del servicio (Martes):",
					body : "Hola, buen día! Mañana martes pasaremos retirando sus residuos orgánicos en el mismo horario de siempre. Recuerden que esta semana deben efectuar el pago del servicio y enviar comprobante. Muchas gracias y buen comienzo de semana!"
				},
				{
					type : "Mensaje con cobro del servicio (Viernes):",
					body : "Hola, buen día! Mañana viernes pasaremos retirando sus residuos orgánicos en el mismo horario de siempre. Recuerden que esta semana deben efectuar el pago del servicio y enviar comprobante. Muchas gracias y buen fin de semana!"
				},
				{
					type : "Mensaje para confirmar compost:",
					body : "Hola, buen día! La próxima semana les corresponde entrega del compost por cumplir ya 4 meses del servicio de retiro de residuos orgánicos.  Agradecemos infinitamente la confianza que han puesto en nuestro servicio. Por lo tanto, necesitamos nos confirmen qué tipo de saco les gustaría recibir en esta oportunidad. Los formatos son los siguientes: -Saco de 50 L, es tierra compost principalmente. Saca de 10 L, es una mezcla fortificada de humus, perlita y vermiculita, lista para colocar en sus plantas. Quedo atenta a cualquier duda, muchas gracias!"
				}
			]
};
var reuso_control_model = {
	dbname : window.db_name,
	tables : {
				users : users,
				wastes : wastes,
				sessions : sessions,
				notifications : notifications,
				messages : messages,
				phones : phones
			 },
	seeds : seeds
};
