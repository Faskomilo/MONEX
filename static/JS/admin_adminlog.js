$(document).ready(function(){
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/admin/getAdminLog",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();
                registry = Object.keys(this.response.data)
                for(let registry in this.response.data){
                    $('#tbodyUserAction').append('<tr>' +
                                                 '<td>'+ registry +'</td>' +
                                                 '<td>'+ this.response.data[registry].idAdmin +'</td>' +
                                                 '<td>'+ this.response.data[registry].date +'</td>' +
                                                 '<td>'+ this.response.data[registry].idBill +'</td>' +
                                                 '<td>'+ this.response.data[registry].quantityBills +'</td>' +
                                                 '<td>'+ this.response.data[registry].beforeQuantityBills +'</td>' +
                                                 '<td>'+ this.response.data[registry].afterQuantityBills +'</td>' +
                                                 '<td>'+ this.response.data[registry].action +'</td>' +
                                                 '<td>'+ this.response.data[registry].date +'</td>' +
                                                 '</tr>'
                                                );
                }

                $('#tableUserAction').DataTable();
            }
            else{
                document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
        }
    })
});