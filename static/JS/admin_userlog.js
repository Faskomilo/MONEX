$(document).ready(function(){   
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/logs/userLog",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            console.log(response);
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();

                for(let registry in this.response.data){
                    $('#tbodyUserAction').append('<tr>' +
                                                 '<td>'+ this.response.data[registry].id +'</td>' +
                                                 '<td>'+ this.response.data[registry].bill +'</td>' +
                                                 '<td>'+ this.response.data[registry].billsGiven +'</td>' +
                                                 '<td>'+ this.response.data[registry].date +'</td>' +
                                                 '</tr>'
                                                );
                }

                $('#tableUserAction').DataTable();
            }
        }
    })
});