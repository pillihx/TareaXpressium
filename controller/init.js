//                  ESTE INIT ESTA EN DEHUSO OJO
//                  ESTE INIT ESTA EN DEHUSO OJO
//                  ESTE INIT ESTA EN DEHUSO OJO
var scripts =  [
    "assets/js/crypto/aes.js",
    "controller/kernel/variables.js",
    "controller/kernel/functions.js",
    "controller/kernel/modelDB.js",
    "controller/kernel/rest.js"
];
function init(scripts, callback=undefined){
    if(scripts.length != 0){
        var src = scripts[0];
        scripts.shift();

        var s = document.createElement('script');
        s.src = src + "?v=" + (Math.random().toString());
        s.type = "text/javascript";
        s.async = false;  

        s.onload = function(){
            console.log("Ready " + src);
            init(scripts, callback);
        };          
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    else
        callback();
}
//CUANDO EL DOCUMENTO SE HAYA CARGADO...  
$(document).ready(function(){
    console.log("Document Ready");
    init(scripts,function(){
        callDB(
            {
                type_request : 'select',
                db_name : 'reuso_control',
                table_name : 'users',
                columns : ['pass'],
                where_select : {username : 'cherrera'} //WHERE
            },
            function(response){
                console.log(buildResponse(response));
            }
        );
    });
});