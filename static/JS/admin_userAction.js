$(document).ready(function(){
    $('#tableUserAction').DataTable();
/*
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/admin/userAction",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            console.log(response);
            this.response = response;

            if(this.response.success === "ok"){
                $('#tableUserAction').empty();
                $('#tableUserAction').append('<tr><th>Id</th><th>Denominación seleccionada</th><th>Cambio entregado</th><th>Fecha y hora</th></tr>');

                for(let registry in this.response.data){
                    $('#tableUserAction').append('<tr>' +
                                                 '<td>'+ this.response.data[registry].id +'</td>' +
                                                 '<td>'+ this.response.data[registry].bill +'</td>' +
                                                 '<td>'+ this.response.data[registry].billsGiven +'</td>' +
                                                 '<td>'+ this.response.data[registry].date +'</td>' +
                                                 '</tr>'
                                                );
                }
            }
        }
    })*/
});