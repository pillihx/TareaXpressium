//CREAR FUNCION PARA CONSEGUIR HOST PATH

function callDB(requestDB,success=undefined,beforeSend=undefined){
    $.ajax({
    	type:  'POST',
    	url:   window.server_name+"/database/consult_query.php",
        data:  requestDB,
        beforeSend: beforeSend
	})
	.done(success)
	.fail(function(xhr){
		console.log("error", xhr);
	});
};
/******** EXAMPLES CALLS *********/

/*
callDB({type_request:"insert",db_name:"reuso_control",table_name:"users",object_insert:{
	username : "jmiranda",
	pass : hashPass("pass"),
	email : "jose.miranda.13@sansano.usm.cl"
}},callback);
*/
/*
callDB(
	{
		type_request : 'schema',
		modelDB : reuso_control_model
	},
	callback
);*/
/*callDB({type_request:"create",type_create:"COLUMN",object_create:["reuso_control","users","name_complete","VARCHAR(25)"]});*/
/*callDB(
	{
		type_request : 'select',
		db_name : 'reuso_control',
		table_name : 'users',
		columns : ['*'],
		where_select : {username : 'cherrera', pass : hashPass('pass')} //WHERE
	},
	callback
);*/
/*callDB({type_request:"create",type_create:"COLUMN",object_create:["reuso_control","users","name_complete","VARCHAR(25)"]});*/