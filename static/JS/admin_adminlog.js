$(document).ready(function(){
    let origin = window.location.origin;
    
    $.ajax({
        type: "GET",
        url: origin + "/admin/getAdminLog",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyAdminAction').empty();

                registries = Object.keys(this.response.data);
                if(registries.length > 0){
                    
                    for(let index in registries){
                        $('#tbodyAdminAction').append('<tr>' +
                                                     '<td>'+ registries[index] +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].idAdmin +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].idBill +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].newQuantityBills +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].beforeQuantityBills +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].action +'</td>' +
                                                     '<td>'+ this.response.data[registries[index]].date +'</td>' +
                                                     '</tr>'
                                                    );
                    }
    
                    $('#tableAdminAction').DataTable();
                }
                else{
                    $('#tableAdminAction').hide();
                    $('#divContent').append('<div class="alert alert-info" role="alert" style="text-align:center">Por el momento no hay registros de movimientos de administradores.</div>');
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