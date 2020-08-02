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
                let registries = Object.keys(this.response.data)
                for(let index in registries){
                    $('#tbodyUserAction').append('<tr>' +
                                                 '<td>'+ registries[index] +'</td>' +
                                                 '<td>'+ this.response.data[registries[index]].idBill +'</td>' + +'</td>' +
                                                 '<td>'+ this.response.data[registries[index]].idBill +'</td>' +
                                                 '<td>'+ this.response.data[registries[index]].billsGiven +'</td>' +
                                                 '<td>'+ this.response.data[registries[index]].date +'</td>' +
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