window.key_hash = "pilli"; 
window.db_name = "reusocl_control";
window.server_name = location.protocol + '//' + location.host + "/reuso_control";

$.getJSON("https://api.ipify.org/?format=json", function(e) {
    window.ip_device = e.ip;
});

window.session_current = null;
window.user_current = null;
window.name_company = "reuso";

