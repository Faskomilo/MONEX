responsiveVoice.setDefaultVoice("Spanish Latin American Female");

$(document).ready(function(){   
    let origin = window.location.origin;

    $.ajax({
        type: "GET",
        url: origin + "/admin/getUserLog",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            this.response = response;
            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();
                let registries = Object.keys(this.response.data)
                if(registries.length > 0){
                    for(let index in registries){
                        $('#tbodyUserAction').append('<tr>' +
                                                     '<td>'+ registries[index] +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].idBill +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].billsGiven +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].date +'</td>' +
                                                     '</tr>'
                                                    );
                    }
    
                        $('#tableUserAction').DataTable();
                }
                
                else{
                    $('#tableUserAction').hide();
                    $('#divContent').append('<div class="alert alert-info" role="alert" style="text-align:center">Por el momento no hay registros de movimientos de usuarios.</div>');
                }
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
    responsiveVoice.speak("Movimientos de usuarios, aquí podras ver los registros de todos los movimientos realizados por los usuarios.","Spanish Latin American Female");
}