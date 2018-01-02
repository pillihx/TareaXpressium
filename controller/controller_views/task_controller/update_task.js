function buildInputUpdateTask(idRow){
	var row = $("#tr_"+idRow)[0];
	var values_old = {};
	$.each(row.childNodes,function(index,value){
		if(index != 0 && index != row.childNodes.length - 1){//EVITAMOS PASAR POR EL PRIMER TD QUE SERÍA # , Y EL ULITMO TD, QUE SON LOS BOTONES DE ACCIÓN
			//GUARDAMOS LOS VALORES ANTIGUOS DE ESA TAREA
			values_old[value.id] = value.innerText;
			//SE CREAN LOS INPUT
			if(value.id.split("-")[1] == "state_name"){
				var input = add_element_html("DIV","col-sm-9",undefined,undefined,undefined,undefined);
				callDB( //CONSEGUIMOS TODOS LOS ESTADO QUE EXISTEN
					{
						type_request : 'select',
						db_name : window.db_name,
						table_name : 'states',
						columns : ['*'],
						where_select : '*' 
					},function(response){
						var result = getResultResponse(response);
						var select_state = add_element_html("SELECT","form-control",undefined,"input-id_state-"+idRow,undefined,input);
						//SE RELLENA EL SELECT CON LOS ESTADOS CONSEGUIDOS
						$.each(Object.values(result), function(index,value){
							var option = add_element_html("OPTION",undefined,undefined,"id_state-"+value.id,value.state_name,select_state);
							option.value = value.id;
						});
						//BUSCAREMOS EL ID CORRESPONDIENTE A ESE ESTADO
						$.each(Object.values(result),function(index,value){
							if(value.state_name == values_old["td-state_name"])
								$(select_state).val(value.id);
						});
					}
				);
			}
			else{
				var input = add_element_html("INPUT","form-control",undefined,"input-"+value.id.split("-")[1]+"-"+idRow,undefined);
				input.type = recognizeTypeColumnTables(task_xpressium).tasks[value.id.split("-")[1]];
				input.value = values_old[value.id];
			}
			//SE REEMPLAZA EL TEXTO DENTRO DE LOS TD CON LOS NUEVOS INPUT
			
			value.childNodes[0].replaceWith(input);
		}
	});
	//SE CREA EL BOTON PARA VOLVER A LOS TEXTO DE LOS TD SACANDO LOS INPUT
	var button_close_inputs = add_element_html("BUTTON","btn btn-warning btn-xs",undefined,undefined,undefined,undefined);
	add_element_html("I","fa fa-arrow-up",undefined,undefined,undefined,button_close_inputs);
	$(button_close_inputs).click(function(){
		closeInputUpdateTask(idRow,values_old);
	});

	//SE REEMPLAZA POR EL BOTON QUE CREÓ LOS INPUTS
	$(row.childNodes[row.childNodes.length - 1].childNodes[0].childNodes[0]).replaceWith(button_close_inputs);
	//SE HABILITA EL BOTON PARA EDITAR AL CONTACTO CORRESPONDIENTE
	$(row.childNodes[row.childNodes.length - 1].childNodes[0].childNodes[1]).removeClass("disabled");
	//SE DEHABILITA EL BOTON PARA ELIMINAR AL CONTACTO CORRESPONDIENTE
	$(row.childNodes[row.childNodes.length - 1].childNodes[0].childNodes[2]).addClass("disabled");
}
function closeInputUpdateTask(idRow,values_old){
	var row = $("#tr_"+idRow)[0];

	$.each(row.childNodes,function(index,value){
		if(index != 0 && index != row.childNodes.length - 1){//EVITAMOS PASAR POR EL PRIMER TD QUE SERÍA # , Y EL ULITMO TD, QUE SON LOS BOTONES DE ACCIÓN
			//REEMPLAZAMOS LOS INPUT POR LOS VALORES ANTIGUOS
			value.childNodes[0].replaceWith(values_old[value.id]);
		}
	});

	//SE CREA EL BOTON PARA VOLVER A LOS INPUTS
	var button_input = add_element_html("BUTTON","btn btn-info btn-xs",undefined,undefined,undefined,undefined);
	add_element_html("I","fa fa-arrow-down",undefined,undefined,undefined,button_input);
	$(button_input).click(function(){
		buildInputUpdateTask(idRow);
	});

	//SE REEMPLAZA POR EL BOTON QUE CREÓ LOS INPUTS
	$(row.childNodes[row.childNodes.length - 1].childNodes[0].childNodes[0]).replaceWith(button_input);
	//SE HABILITA EL BOTON PARA EDITAR AL CONTACTO CORRESPONDIENTE
	$(row.childNodes[row.childNodes.length - 1].childNodes[0].childNodes[1]).addClass("disabled");
	//SE DEHABILITA EL BOTON PARA ELIMINAR AL CONTACTO CORRESPONDIENTE
	$(row.childNodes[row.childNodes.length - 1].childNodes[0].childNodes[2]).removeClass("disabled");
}
function sendDataUpdateTask(idRow){
	var row = $("#tr_"+idRow)[0];
	var object_for_send = {}
	var object_for_row = {}
	var check_for_send = true;

	$.each(row.childNodes,function(index,value){
		if(index != 0 && index != row.childNodes.length - 1){//EVITAMOS PASAR POR EL PRIMER TD QUE SERÍA # , Y EL ULITMO TD, QUE SON LOS BOTONES DE ACCIÓN
			//CONSEGUIMOS EL VALOR DEL INPUT DE UPDATE DE ESA TAREA
			if(value.id.split("-")[1] == "state_name"){
				object_for_row[value.id] = $(row).find("#id_state-"+$("#input-id_state-"+idRow).val())[0].innerText;
				object_for_send["id_state"] = $("#input-id_state-"+idRow).val();
			}
			else{
				if($("#input-"+value.id.split("-")[1]+"-"+idRow).val() == ""){
					check_for_send = false
					iziToast.success({//NOTIFICACION DE ENVIO SATISFACTORIO
					    title: 'Error',
					    message: 'No puede quedar en blanco '+ value.id.split("-")[1]
					});
					return;
				}
				object_for_row[value.id] = $("#input-"+value.id.split("-")[1]+"-"+idRow).val();
				object_for_send[value.id.split("-")[1]] = $("#input-"+value.id.split("-")[1]+"-"+idRow).val();
			}
		}
	});

	console.log(object_for_row);

	if(check_for_send){
		confirmAlert("Confirmar","¿Está seguro de actualizar la Tarea?",function(){
			callDB( //ACTUALIZAMOS LOS NUEVOS DATOS DE LA TAREA
				{
					type_request : 'update',
					db_name : window.db_name,
					table_name : 'tasks',
					columns_update : object_for_send,
					where_update : {id : idRow}
				},function(){
					iziToast.success({//NOTIFICACION DE ENVIO SATISFACTORIO
					    title: 'Excelente',
					    message: '¡Tarea actualizada con éxito!'
					});
					closeInputUpdateTask(idRow,object_for_row);
				}
			);
		});
	}
}