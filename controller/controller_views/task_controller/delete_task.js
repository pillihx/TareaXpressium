function deleteTask(idRow){
	confirmAlert("Confirmar","¿Esta seguro que desea eliminar la Tarea?",function(){
		callDB( //ELIMINAMOS LA TAREA
			{
				type_request : 'delete',
				type_delete : 'ROW',
				object_delete : {		
					db_name : window.db_name,	
					table_name : 'tasks',
					where_delete : {id : idRow} 
				}
			},function(){
				$("#tr_"+idRow).remove();
				iziToast.success({//NOTIFICACION DE ENVIO SATISFACTORIO
				    title: 'Excelente',
				    message: 'Tarea eliminada con éxito!',
				});
		});
	});	
}