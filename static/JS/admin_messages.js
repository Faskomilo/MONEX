responsiveVoice.setDefaultVoice("Spanish Latin American Female");

$(document).ready(function(){
    let origin = window.location.origin;

    $.ajax({
        type: "GET",
        url: origin + '/admin/getMessages',
        contentType: "application/json; charset=utf-8",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();

                registries = Object.keys(this.response.data);
                if(registries.length != 0){

                    for(let denomination in registries){
                        if(this.response.data[registries[denomination]]["Status"] == "excess"){
                            $('#divShowMessages').append('<div class="alert alert-warning" role="alert">'+this.response.data[registries[denomination]]["Message"]+'</div>');
                        }
                        else if(this.response.data[registries[denomination]]["Status"] == "low"){
                            $('#divShowMessages').append('<div class="alert alert-danger" role="alert">'+this.response.data[registries[denomination]]["Message"]+'</div>');
                        }
                    }
                }
                else{
                    $('#divShowMessages').append('<div class="alert alert-success" role="alert">Por el momento no hay mensajes a mostrar, esto significa que las cantidades dentro de la máquina de cambio están dentro del rango aceptado.</div>');
                }

                $('#tableUserAction').DataTable();
            }
            else{
                if(this.response.message == "UNAUTHORIZED"){
                    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    document.location.replace(origin+"/monex/index")
                }            
            }
        }
    })
});

function playVB(){
    responsiveVoice.speak("Apartado de mensajes, aquí podrás observar distintos mensajes los cuáles indican los cambios necesarios a realizar para los recursos de la máquina de cambio.","Spanish Latin American Female");
}