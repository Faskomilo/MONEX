$(document).ready(function(){
    let origin = window.location.origin;

    $.ajax({
        type: "GET",
        url: origin + '/get/messages',
        contentType: "application/json; charset=utf-8",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                $('#tbodyUserAction').empty();

                for(let registry in this.response.data){
                    if(this.response.data.status[registry] == "excess"){
                        $('#divShowMessages').append('<div class="alert alert-warning" role="alert">'+this.response.data.message[registry]+'</div>');
                    }
                    /*if(this.response.data.status[registry] == "low")*/
                    else{
                        $('#divShowMessages').append('<div class="alert alert-danger" role="alert">'+this.response.data.message[registry]+'</div>');
                    }
                }

                $('#tableUserAction').DataTable();
            }
            else{
                if(this.response.message == "UNATHORIZED"){
                    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }            
            }
        }
    })
});