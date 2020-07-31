$(document).ready(function(){
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/logs/adminLog",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            console.log(response);
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();

                for(let registry in this.response.data){
                    $('#tbodyUserAction').append('<tr>' +
                                                 '<td>'+ this.response.data[registry].id +'</td>' +
                                                 '<td>'+ this.response.data[registry].username +'</td>' +
                                                 '<td>'+ this.response.data[registry].Bill +'</td>' +
                                                 '<td>'+ this.response.data[registry].action +'</td>' +
                                                 '<td>'+ this.response.data[registry].date +'</td>' +
                                                 '</tr>'
                                                );
                }

                $('#tableUserAction').DataTable();
            }
        }
    })
});