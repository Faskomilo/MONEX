$(document).ready(function(){   
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/admin/getUserLog",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            console.log(response);
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();
                registry = Object.keys(this.response.data)
                for(let registry in this.response.data){
                    $('#tbodyUserAction').append('<tr>' +
                                                 '<td>'+ registry +'</td>' +
                                                 '<td>'+ this.response.data[registry].idBill +'</td>' +
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