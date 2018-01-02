$("#button_add_task").click(function(){
	ShowHide(buildViewAddTask);
});
function buildViewAddTask(){
	
	buildPageHeader("Agregar Tarea");

	var page_wrapper = document.getElementById("page-wrapper"); //CONTENIDO 
	var row_content_table = add_element_html("DIV","row",undefined,undefined,undefined,page_wrapper);

	var content = buildPanel("col-lg-8","fa fa-tasks","Rellene los campos",row_content_table,"panel-info");
	//var content = add_element_html("DIV","col-lg-12",undefined,undefined,undefined,row_content_table);

	$.each(recognizeTypeColumnTables(task_xpressium).tasks, function(index,value){
		var form_group = add_element_html("DIV","form-group row",undefined,undefined,undefined,content);

		if(index != "id_state"){
			add_element_html("LABEL","col-sm-3 col-form-label",undefined,undefined,index.toUpperCase(),form_group);
			var div_input = add_element_html("DIV","col-sm-9",undefined,undefined,undefined,form_group);
			var input = add_element_html("INPUT","form-control",undefined,"input-"+index,undefined,div_input);
			input.type = value;
		}
		else{
			add_element_html("LABEL","col-sm-3 col-form-label",undefined,undefined,"STATE",form_group);
			var div_select = add_element_html("DIV","col-sm-9",undefined,undefined,undefined,form_group);
			callDB( //CONSEGUIMOS TODOS LOS ESTADO QUE EXISTEN
				{
					type_request : 'select',
					db_name : window.db_name,
					table_name : 'states',
					columns : ['*'],
					where_select : '*' 
				},function(response){
					var result = getResultResponse(response);
					var select_state = add_element_html("SELECT","form-control",undefined,"input-id_state",undefined,div_select);

					$.each(Object.values(result), function(index,value){
						var option = add_element_html("OPTION",undefined,undefined,undefined,value.state_name,select_state);
						option.value = value.id;
					});
				}
			);
		}
	});	
	var div_button_group = add_element_html("DIV","btn btn-group pull-right",undefined,undefined,undefined,content);
	var button_send_task_for_save = add_element_html("BUTTON","btn btn-success",undefined,undefined,"Guardar",div_button_group);

	//ONCLICK
	$(button_send_task_for_save).click(function(){
		send_task_for_save();
	});
}
function send_task_for_save(){
	confirmAlert("Confirmar","¿Está seguro de agregar una nueva Tarea?",function(){
		var object_for_send = {}
		var check_for_send = true;
		$.each(recognizeTypeColumnTables(task_xpressium).tasks, function(index,values){
			if($("#input-"+index).val() == ""){
				iziToast.error({
				    title: 'Error',
				    message: 'Porfavor ingrese '+ index.toUpperCase(),
				});
				check_for_send = false;
				return;
			}
			object_for_send[index] = $("#input-"+index).val();
		});
		if(check_for_send){
			callDB( //AGREGAMOS UNA NUEVA TAREA
				{
					type_request:"insert",
					db_name:window.db_name,
					table_name:"tasks",
					object_insert: object_for_send
				},function(){
					clear_inputs(recognizeTypeColumnTables(task_xpressium).tasks);
					iziToast.success({
					    title: 'Genial',
					    message: 'Tarea guardada satisfactoriamente',
					});
			});
		}
	});
}
function clear_inputs(model_inputs){
	$.each(model_inputs, function(index,value){
		$("#input-"+index).val('');
	});
}
