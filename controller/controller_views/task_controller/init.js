var scripts =  [
    "assets/js/iziToast/iziToast.js",
    "controller/kernel/variables.js",
    "controller/kernel/functions.js",
    "controller/kernel/modelDB.js",
    "controller/kernel/rest.js",
    //TASK CONTROLLER
    "controller/controller_views/task_controller/build_view.js",
    "controller/controller_views/task_controller/add_task.js",
    "controller/controller_views/task_controller/update_task.js",
    "controller/controller_views/task_controller/delete_task.js"
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
    init(scripts, function(){
        buildViewTask();
    });
});