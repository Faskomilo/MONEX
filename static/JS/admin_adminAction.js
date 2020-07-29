$(document).ready(function(){
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/admin/adminAction",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            console.log(response);
            this.response = response;

            if(this.response.success === "ok"){
                $('#tableAdminAction').empty();
                $('#tableAdminAction').append('<tr><th>Id</th><th>Usuario</th><th>Denominación seleccionada</th><th>Acción</th><th>Fecha y hora</th></tr>');

                for(let registry in this.response.data){
                    $('#tableUserAction').append('<tr>' +
                                                 '<td>'+ this.response.data[registry].id +'</td>' +
                                                 '<td>'+ this.response.data[registry].username +'</td>' +
                                                 '<td>'+ this.response.data[registry].Bill +'</td>' +
                                                 '<td>'+ this.response.data[registry].action +'</td>' +
                                                 '<td>'+ this.response.data[registry].date +'</td>' +
                                                 '</tr>'
                                                );
                }
            }
        }
    })
});