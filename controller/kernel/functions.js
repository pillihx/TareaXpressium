//FUNCIONES DE VISTAS
function add_element_html(type_element, class_element, style_element, id_element, text_element, father_element){
    //Function that make an element html and it return
    var dom = document.createElement(type_element);
    
    if(class_element != undefined)dom.className = class_element;
    if(style_element != undefined)dom.style = style_element;
    if(id_element != undefined)dom.id = id_element;
    if(text_element != undefined)dom.appendChild(document.createTextNode(text_element));
    if(father_element != undefined)father_element.appendChild(dom);    
    
    return dom;
}
function buildPageHeader(title){
    var page_wrapper = document.getElementById("page-wrapper");
    var div = add_element_html("DIV","row",undefined,undefined,undefined,page_wrapper);
    var div_col = add_element_html("DIV","col-lg-12",undefined,"div-header-page",undefined,div);
    var h1 = add_element_html("H1","page-header",undefined,undefined,title,div_col);//CONSTRUYE EL TITULO DEL CONTENT
}
function buildPanel(class_col,class_icon,title_panel,row,type_panel){
    
    var div_col = add_element_html("DIV",class_col,undefined,undefined,undefined,row);
    var div_panel = add_element_html("DIV","panel "+type_panel,undefined,undefined,undefined,div_col);
    var panel_heading = add_element_html("DIV","panel-heading",undefined,undefined,undefined,div_panel);
    add_element_html("I",class_icon,undefined,undefined,undefined,panel_heading);
    panel_heading.appendChild(document.createTextNode(" " + title_panel));

    var div_panel_body = add_element_html("DIV","panel-body",undefined,undefined,undefined,div_panel);
    return div_panel_body;//CONSTRUYE UN PANEL DENTRO DEL CONTENT
}
function ShowHide(buildContent){
    $("#page-wrapper").hide("2000",function(){

        $("#page-wrapper").html(""); //ELIMINAMOS LO QUE HAYA EN EL CONTENT

        buildContent();

        $("#page-wrapper").show("2000");
    });//FUNCION QUE OCULTA Y MUESTRA EL CONTENIDO DE LA PAGINA, Y PONE EL GENERADO POR LA FUNCION QUE SE LE ESTA PASANDO
}
function putNotificationToView(textNotification,dateNotification){
    var notification_header = document.getElementById("notification_header");
    var a = add_element_html("A",undefined,undefined,undefined,undefined,notification_header);
    add_element_html("I","fa fa-comment fa-fw",undefined,undefined,undefined,a);
    add_element_html("SPAN",undefined,undefined,undefined,textNotification,a);
    add_element_html("SPAN","pull-right text-muted small",undefined,undefined,dateNotification,a);
}
function buildActionContent(panelHeading,arrayButtons){
    //BOTONES DE ACCIÓN
    var div_pull_right = add_element_html("DIV","pull-right",undefined,undefined,undefined,panelHeading);
    var div_btn_group = add_element_html("DIV","btn-group",undefined,undefined,undefined,div_pull_right);
    var button_dropdown = add_element_html("BUTTON","btn btn-default btn-xs dropdown-toggle",undefined,undefined,undefined,div_btn_group);
    add_element_html("SPAN","caret",undefined,undefined,undefined,button_dropdown);
    button_dropdown.setAttribute("data-toggle","dropdown");

    var ul_actions = add_element_html("UL","dropdown-menu pull-right",undefined,undefined,undefined,div_btn_group);

    $.each(arrayButtons, function(index, value) {
        var li = add_element_html("LI",undefined,undefined,undefined,undefined,ul_actions);
        var a = add_element_html("A",undefined,undefined,undefined,value["title_button"],li);
        $(a).click(function(){
            value["function_button"]();
        }); 
    });
}
function create_table(object_rows,title,columns_hidden,id_row,array_callback_to_action,father_table,columns_filter_boolean){
    //FUNCION QUE CREA UNA TABLA EN UN CONTENT CON EL OBJECT_ROWS QUE ES LA INFORMACIÓN COMPLETA RESUMIDA EN UN OBJETO ASOCIADO CON EL
    //DE LAS COLUMNAS COMO LLAVE QUE VIENEN DEL HANDLER. TITLE QUE INDICARA EL TITULO DE LA PAGINA, COLUMNS_HIDDEN QUE ES UN ARRAY CON
    //LAS COLUMNAS QUE NO QUIERO QUE SE MUESTREN PERO SI LAS NECESITO
    //Y POR ULTIMO ID_ROW QUE INDICA QUE COLUMNA QUE VIENE CON EL OBJECT_ROW ES EL ID DE LA FILA.
    //SI LA BUSQUEDA ARROJA RESULTADO
    if(object_rows.length != 0){
        //OBJETO DE COINCIDENCIAS
        var object_coincidences = {};
        //SETEAMOS LOS ELEMENTOS DE CABECERA EN UN ARRAY QUE SON LOS NOMBRE DE LAS COLUMNAS EN EL OBJECT_ROWS
        var element_head = Object.keys(object_rows[0]);
        //SETEAMOS EL LARGO DE LOS ELEMENTOS DE CABECERA
        var element_head_length = Object.keys(object_rows[0]).length;
        //SE SETEA LA CLASE AL CONTENT PARA QUE TENGA UNA TABLA RESPONSIVE
        father_table.setAttribute("class","content table-responsive table-full-width");
        //SE CREA LA TABLA
        var table = add_element_html("TABLE","table table-striped",undefined,"table",undefined,father_table);
        //SETEO DE ATRIBUTOS PARA LA POSIBLE GRAFICA
        table.setAttribute("data-graph-container-before","1");
        table.setAttribute("data-graph-type","spline");
        //SE CREA LA CABECERA
        var thead = add_element_html("THEAD",undefined,undefined,undefined,undefined,table);
        //LA FILA DE LA CABECERA
        var tr = add_element_html("TR",undefined,undefined,undefined,undefined,thead);
        //SE LLENAN LAS COLUMNAS DESDE ELEMENT_HEAD EVITANDO MOSTRAR LAS QUE ESTEN EN COLUMNS_HIDDEN
        add_element_html("TH",undefined,undefined,undefined,"#",tr);//NUMERACION
        for(var i=0; i < element_head_length; i++){
            if(!columns_hidden.includes(element_head[i]))//SE EVITA
                add_element_html("TH",undefined,undefined,undefined,element_head[i],tr);
        }
        if(array_callback_to_action.length != 0)
            add_element_html("TH",undefined,undefined,"th_action",undefined,tr);
        //SE CREA FILA PARA LOS INPUT DE FILTROS DINAMICA EN LA TABLA SI EL BOOULEANO DEL FILTRO DE LAS COLUMNAS ES TRUE
        if(columns_filter_boolean){
            //SE CREA EL TBODY ACTION FILTER COLUMN
            var tbody = add_element_html("TBODY",undefined,undefined,"tbody_action",undefined,table);

            var tr = add_element_html("TR",undefined,undefined,"tr_for_inputs",undefined,tbody);//TD VACIO YA QUE ES EL TD QUE VA DEBAJO DE # (COLUMNA NUMERACION)
            var td = add_element_html("TD","dropdown",undefined,undefined,undefined,tr);

            //SE AGREGA EL BOTON PARA AGREGAR O QUITAR NUESVAS COLUMNAS
            /*
            var button_columns = add_element_html("BUTTON","btn btn-danger btn-fill dropdown-toggle",undefined,undefined,undefined,td);
            button_columns.setAttribute("data-toggle","dropdown");
            button_columns.setAttribute("aria-expanded","false");

            add_element_html("I","fa fa-arrow-circle-down",undefined,undefined,undefined,button_columns);

            var div_content_all_columns = add_element_html("DIV","dropdown-menu row","margin-left:5px;box-shadow: 10px 10px 5px #888888;background-color:#EDEDED;width:"+String(Math.ceil(element_head_length/9) * 200)+"px;",undefined,undefined,td);
            var col = Math.ceil(12/(Math.ceil(element_head_length/9))); //CALCULA LA CANTIDAD DE COLUMNAS BOOTSTRAP
            for(var i=0; i < element_head_length; i++){
                if(i%9 == 0)var div = add_element_html("DIV","col-xs-"+String(col),undefined,undefined,undefined,div_content_all_columns);
                if(i==0){
                    //SE AGREGA AL PRINCIPIO BOTON PARA SELECCIONAR TODAS LAS COLUMNAS
                    var button_all_columns = add_element_html("BUTTON","btn btn-fill btn-success btn-xs btn-block",undefined,undefined,"Seleccionar Todas",div);
                    button_all_columns.onclick = function(){
                        father_table.innerHTML = "";
                        console.log(element_head);
                        create_table(object_rows,title,[],id_row,array_callback_to_action,father_table,columns_filter_boolean);
                    };
                }
                var label = add_element_html("P",undefined,undefined,undefined,undefined,div);
                //var li = add_element_html("LI",undefined,undefined,undefined,undefined,div);
                var input = add_element_html("INPUT",undefined,undefined,"check_option_"+element_head[i],undefined,label);
                label.appendChild(document.createTextNode(element_head[i].toUpperCase()));
                input.type = "checkbox";
                if(!columns_hidden.includes(element_head[i]))
                    input.checked = true;
            }
            var button_send = add_element_html("BUTTON","btn btn-fill btn-danger btn-xs btn-block",undefined,undefined,"Aceptar",div);
            button_send.onclick = function(){
                var columns_hidden_with_checked = [];
                for(var i=0; i < element_head_length; i++){
                    if(!document.getElementById("check_option_"+element_head[i]).checked)
                        columns_hidden_with_checked.push(element_head[i]);
                }
                father_table.innerHTML = "";
                create_table(object_rows,title,columns_hidden_with_checked,id_row,array_callback_to_action,father_table,columns_filter_boolean);
            };*/

            for(var i=0; i < element_head_length; i++){
                if(!columns_hidden.includes(element_head[i])){//SE EVITA
                    var td = add_element_html("TD",undefined,undefined,undefined,undefined,tr);
                    var input = add_element_html("INPUT","form-control",undefined,"input_"+element_head[i],undefined,td);
                    input.placeholder = "Filtrar por "+element_head[i];
                    input.type = "search";
                    //EVENTO CUANDO CAMBIA UN INPUT DE COLUMNA
                    $("#input_"+element_head[i]).on("keyup keypress keydown change search",{head_column:element_head[i]},function(event){
                        //CUANDO CAMBIA EL INPUT DE UN FILTRO POR TABLA, LE AGREGA EL VALOR AL OBJETO DE COINCIDENCIA
                        object_coincidences[event.data.head_column] = document.getElementById("input_"+event.data.head_column).value;
                        fill_body_table(object_rows,object_coincidences,table,array_callback_to_action,id_row,columns_hidden);
                        if(document.getElementById("input_"+event.data.head_column).value == "")
                            delete object_coincidences[event.data.head_column];
                    });
                }
            }
        }
        //SE COMIENZAN A LLENAR LAS FILAS RECORRIENDO LAS FILAS DEL OBJECT_ROWS 
        fill_body_table(object_rows,{},table,array_callback_to_action,id_row,columns_hidden);
    }
    //SI LA BUSQUEDA NO ARROJA RESULTADO
    else
        add_element_html("H3","text-center",undefined,undefined,"No hay "+title,father_table);
}
function fill_body_table(object_rows,object_coincidences,table,array_callback_to_action,id_row,columns_hidden){
    //CONTADOR DE FILAS MOSTRADAS 
    var c = 0;
    //LIMPIAR TODAS LAS FILAS TR DEL TBODY<
    $("#tbody_rows").remove();
    var tbody = add_element_html("TBODY",undefined,undefined,"tbody_rows",undefined,table)
    //SETEAMOS LOS ELEMENTOS DE CABECERA EN UN ARRAY QUE SON LOS NOMBRE DE LAS COLUMNAS EN EL OBJECT_ROWS
    var element_head = Object.keys(object_rows[0]);
    //SETEAMOS EL LARGO DE LOS ELEMENTOS DE CABECERA
    var element_head_length = Object.keys(object_rows[0]).length;
    //SETEAMOS LAS LLAVES DE LAS COINCIDENCIAS (filtros columnas)
    var array_keys_coincidences = Object.keys(object_coincidences);
    for(var i=0; i < object_rows.length; i++){
        //SETEAMOS BOOLEAN DE COINCIDENCIA EN EL CASO QUE TENGAMOS QUE EXCLUIR LA FILA
        var coincidence_boolean = true;
        //RECORREMOS LAS COINCIDENCIAS POR CADA FILA RESULTADO DEL OBJECT_ROWS
        for(var m = 0; m < array_keys_coincidences.length; m++){
            if(object_rows[i][array_keys_coincidences[m]] != null){
                //CREAR EXPRESION REGULAR
                var regexp = new RegExp(object_coincidences[array_keys_coincidences[m]],"gi");
                //OPERADOR QUE REVISA SI EXISTE COINCIDENCIA
                if((object_rows[i][array_keys_coincidences[m]]).match(regexp) == null)
                    coincidence_boolean = false;
            }
        }
        //SI EN ALGUN MOMENTO SE CAMBIO EL VALOR A FALSE DE COINCIDENCE_BOOLEAN ENTONCES ESA FILA NO COINCIDE CON LOS FILTROS
        if(!coincidence_boolean) continue;
        //SUMA EL CONTADOR EN UNO SI LA FILA SI ESTÁ APROBADA POR EL MATCH DE LA REGEXP
        c = c + 1;
        //SE RECORREN LOS ELEMENTOS DE CABECERA 
        for(var j=0; j < element_head_length; j++){
            //CUANDO SE TERMINA DE RECORRER LOS ELEMENTOS DE CABECERA (SE IDENTIFICA CON EL MODULE) CREAMOS UNA NUEVA FILA (TR)
            if(j % element_head_length == 0){
                var tr = add_element_html("TR",undefined,undefined,"tr_"+object_rows[i][id_row],undefined,tbody);
                add_element_html("TD",undefined,undefined,undefined,i+1,tr);//NUMERACION
            }
            //EVITAMOS MOSTRAR EL ELEMENTO QUE PERTENEZCA A LA COLUMNAS QUE HAY QUE OCULTAR (COLUMNS_HIDDEN)
            if(!columns_hidden.includes(element_head[j]))
                //AGREGAMOS EL ELEMENTO
                if(object_rows[i][element_head[j]] != null)
                    add_element_html("TD",undefined,"font-size:100%;","td-"+element_head[j],((object_rows[i][element_head[j]])).replace(/  +/g, ' '),tr);
                else
                    add_element_html("TD",undefined,"font-size:100%;","td-"+element_head[j],"-",tr);
        }
        if(array_callback_to_action.length != 0){
            //AQUI IRAN LOS BOTONES DE ACCION PARA CADA FILA DE LA TABLA
            var td_action = add_element_html("TD",undefined,undefined,undefined,undefined,tr);
            var div_btn_group = add_element_html("DIV","btn-group",undefined,undefined,undefined,td_action);
            for(var k=0; k < array_callback_to_action.length; k++){
                var button = add_element_html("BUTTON",array_callback_to_action[k].button_class,undefined,undefined,undefined,div_btn_group);
                add_element_html("I",array_callback_to_action[k].icon_class,undefined,undefined,undefined,button);
                button.appendChild(document.createTextNode(array_callback_to_action[k].title_button));

                if(array_callback_to_action[k].parameter_aditional != undefined){
                    var parameter_aditional = ",";
                    for(var m=0; m < (array_callback_to_action[k].parameter_aditional).length; m++){
                        parameter_aditional = parameter_aditional+"'"+(array_callback_to_action[k].parameter_aditional)[m]+"'";
                        if(m != (array_callback_to_action[k].parameter_aditional).length - 1)
                            parameter_aditional = parameter_aditional+",";
                    }
                }
                else
                    var parameter_aditional = "";

                //SE AÑADEN PARAMETROS ESCLUSIVOS QUE VENGAN DEL USUARIO PARA LA FUNCION CALLBACK
                if(array_callback_to_action[k].parameter_from_column != undefined){
                    parameter_from_column = "";
                    for(var m=0; m < (array_callback_to_action[k].parameter_from_column).length; m++){
                        parameter_from_column = parameter_from_column+"'"+object_rows[i][(array_callback_to_action[k].parameter_from_column)[m]]+"'";
                        if(m != (array_callback_to_action[k].parameter_from_column).length - 1)
                            parameter_from_column = parameter_from_column+",";
                    }
                }

                if(array_callback_to_action[k].parameter == "all")
                    button.setAttribute("onClick","javascript: "+array_callback_to_action[k].callback+"('"+JSON.stringify(object_rows[i])+"'"+parameter_aditional+");");
                else if(array_callback_to_action[k].parameter == "_exclusive_")
                    button.setAttribute("onClick","javascript: "+array_callback_to_action[k].callback+"("+parameter_from_column+");");
                else 
                    button.setAttribute("onClick","javascript: "+array_callback_to_action[k].callback+"('"+object_rows[i][array_callback_to_action[k].parameter]+"'"+parameter_aditional+");");
            }
        }
    }
    //AGREGAMOS LA CANTIDAD DE RESULTADOS EN EL TITULO
    if(array_callback_to_action.length != 0)
        if(c == 1)
            document.getElementById("th_action").innerHTML = "<small>"+String(c)+" Resultado </small>";
        else
            document.getElementById("th_action").innerHTML = "<small>"+String(c)+" Resultados </small>";
}
//FUNCIONES DE ALERTA
function confirmAlert(confirmTitle,confirmText,functionYES=undefined, functionNOT = undefined){
    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        toastOnce: true,
        id: 'question',
        zindex: 999,
        title: confirmTitle,
        message: confirmText,
        position: 'center',
        buttons: [
            ['<button><b>YES</b></button>', function (instance, toast) {
     
                instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
                if(functionYES != undefined)functionYES();//EL USUARIO CONFIRMA LA ACCIÓN
     
            }, true],
            ['<button>NO</button>', function (instance, toast) {
     
                instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
                if(functionNOT != undefined)functionNOT();//EL USUARIO RECHAZA LA ACCIÓN
     
            }]
        ],
        onClosing: function(instance, toast, closedBy){
            console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
            console.info('Closed | closedBy: ' + closedBy);
        }
    });
}
//FUNCIONES GENERICAS
function recognizeTypeColumnTables(modelDB){
    var modelDB_for_view = {};

    $.each(modelDB.tables, function(table,table_value){
        modelDB_for_view[table] = {};
        $.each(table_value, function(column,column_value){
            if(column != "id" && column != "FOREIGN"){
                var datatype_dbms = column_value.split(" ")[0];
                if(datatype_dbms == "INT")
                    modelDB_for_view[table][column] = "number";
                if(datatype_dbms == "DATE")
                    modelDB_for_view[table][column] = "date";
                if (datatype_dbms.match(/VARCHAR.*/)){
                    modelDB_for_view[table][column] = "text";
                }
            } 
        });
    });

    return modelDB_for_view;
}
function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
   
    today = dd+'-'+mm+'-'+yyyy;
    return today;   
}
function parseDate(date){
    var split_date = date.split("-");
    return split_date[2]+"-"+split_date[1]+"-"+split_date[0];
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
}
function hashPass(pass){

    return CryptoJS.AES.encrypt(pass, window.key_hash).toString();
}
function decryptPass(hass_pass){
    var bytes  = CryptoJS.AES.decrypt(hass_pass, window.key_hash);
    return bytes.toString(CryptoJS.enc.Utf8);
}
function trim(s){ 

  return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}
function buildResponse(response){
    //FUNCTION THAT DIVIDE RESPONSE FOR TERMINAL AND RESPONSE FOR RESULT, ACCORDING \n
    array_response = trim(response).split("\n");
    object_response = new Object();

    for(var i=0; i<array_response.length; i++){

        var object_temp = JSON.parse(array_response[i]);
        var key_temp = Object.keys(object_temp)[0];
        var value_temp = Object.values(object_temp)[0];


        if(object_response[key_temp] == undefined)
            object_response[key_temp] = [];
        object_response[key_temp].push(value_temp); 
    }

    return object_response;
}
function getResultResponse(response){
    var response = buildResponse(response);
    return response.result[0].content;
}
function getTimeStamp() {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
function getPageName(){

    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}
function resetBD(){
    var pass_secret = prompt("Ingresa la clave secreta porfavor");
    callDB(
        {
            type_request : 'schema',
            modelDB : task_xpressium,
            pass_secret : pass_secret
        },function(response){
            var result = buildResponse(response);
            console.log(result);
            if(Object.keys(result) == "error")
                iziToast.error({//NOTIFICACION DE ENVIO SATISFACTORIO
                    title: 'Lo sentimos',
                    message: 'La clave secreta es incorrecta',
                });
            else
                iziToast.success({//NOTIFICACION DE ENVIO SATISFACTORIO
                    title: 'Excelente',
                    message: 'La Base de Datos ha sido reestablecida',
                });
        }
    );
}
