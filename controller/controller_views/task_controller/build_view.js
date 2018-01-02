$("#button_tasks").click(function(){
	ShowHide(buildViewTask);
});
function buildViewTask(){
	buildPageHeader("Lista de Tareas");

	callDB( //CONSEGUIMOS TODOS LOS CONTACTOS ALMACENADOS EN LA BD
		{
			type_request : 'select',
			db_name : window.db_name,
			table_name : 'tasks INNER JOIN states ON tasks.id_state = states.id',
			columns : ['tasks.id','task_name','responsable','date','last_observation','state_name'],
			where_select : '*' //GET ALL MESSAGES
		},function(response){
			var result = getResultResponse(response);

			var page_wrapper = document.getElementById("page-wrapper"); //CONTENIDO 
			var row_content_table = add_element_html("DIV","row",undefined,undefined,undefined,page_wrapper);
			var div_content_table = add_element_html("DIV","col-lg-12",undefined,undefined,undefined,row_content_table);

			if(result != null){
				create_table(
					result,
					"Tareas",
					["id","id_state"],
					"id",
					[
						//BOTON PARA CONSTRUIR LOS INPUT PARA EDITAR UNA TAREA
						{title_button:"",button_class:"btn btn-info btn-fill btn-xs ",icon_class:"fa fa-arrow-down",callback:"buildInputUpdateTask",parameter:"id",parameter_from_column:[]},
						//BOTON PARA ENVIAR LOS DATOS ACTUALIZADOS DE UNA TAREA
	                    {title_button:"",button_class:"btn btn-success btn-fill btn-xs disabled",icon_class:"fa fa-pencil",callback:"sendDataUpdateTask",parameter:"id",parameter_from_column:[]},
	                    //BOTON PARA ELIMINAR UNA TAREA
	                    {title_button:"",button_class:"btn btn-danger btn-fill btn-xs",icon_class:"fa fa-times",callback:"deleteTask",parameter:"id",parameter_from_column:[]}
					],
					div_content_table,
					[]
				);
				//AGREGAMOS UN BOTON PARA CREAR UN NUEVO CONTACTO
				var td_for_button_new_contact = add_element_html("TD",undefined,undefined,undefined,undefined,document.getElementById("tr_for_inputs"));
				var button_new_contact = add_element_html("BUTTON","btn btn-primary",undefined,undefined,"Agregar",td_for_button_new_contact);
				$(button_new_contact).click(function(){
					ShowHide(buildViewAddTask);
				});
			}
			else{
				add_element_html("H3","title",undefined,undefined,"No existen Tareas registradas :(",div_content_table);
				var button_add_task = add_element_html("BUTTON","btn btn-info",undefined,undefined,"¡Agrega tu primera Tarea ahora!",div_content_table);
				$(button_add_task).click(function(){
					ShowHide(buildViewAddTask);
				});
			}
		}
	);
}
