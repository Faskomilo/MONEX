$(document).ready(function(){

    $('#goToMessages').click(function(){
        var origin = window.location.origin;
        window.location.replace(origin + "/admin/messages");
    });

    $('#goToResources').click(function(){
        var origin = window.location.origin;
        window.location.replace(origin + "/admin/resources");
    });

    $('#goToUserAction').click(function(){
        var origin = window.location.origin;
        window.location.replace(origin + "/admin/userAction");
    });

    $('#goToAdminAction').click(function(){
        var origin = window.location.origin;
        window.location.replace(origin + "/admin/adminAction");
    });

    $('#goToMonex').click(function(){
        var origin   = window.location.origin;
        window.location.replace(origin + "/monex/index");
    });
});

function mute(){
    $('#botMute').show();
    $('#botUnmute').hide();
}
  
function unmute(){
    $('#botMute').hide();
    $('#botUnmute').show();
}

/*
{% extends "admin_view.html" %}
{% block content %}
mensaje
{% endblock %}

{% block content %}
{% endblock %}
*/