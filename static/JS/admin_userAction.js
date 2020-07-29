$(document).ready(function(){
    let origin = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + "/admin/userAction",
        contentType: "application/json; charset=utf-8",
        success: function(response){
            console.log(response);
            this.response = 
            {
                "success":"ok",
                "data":
                {
                    "1"
                }

            };

            if(this.response.success === "ok"){
                
            }
        }
    })
});