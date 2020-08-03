$(document).ready(function(){
    getQuantities();
});

function changeQuantity(){
    if($('.radio_button').is(':checked') && $('#newQuantity').val() != ''){
        $('#modalAlertContinue').modal('show');
    }
    else if($('#newQuantity').val() == ''){
        $('#modalErrorNewQuantity').modal('show');
        $('#newQuantity').val('');
    }
    else{
        $('#modalErrorChoose').modal('show');
    }
}

function getQuantities(){
    let origin  = window.location.origin;

    $.ajax({
        type: "GET",
        url: origin + '/admin/getResources',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                setQuantities(this.response.data);
            }
            else{
                console.log("error:: fallo al extraer cantidades");
            }
        }
    });
}

function setQuantities(json){
    registries = Object.keys(json);
                
    for(let id in registries){
        $('#quantity' + registries[id]).val(json[registries[id]]);
    }
}

function editTrue(){
    let billToChange = document.querySelector('input[name="selectMoney"]:checked').value;
    let newQuantity = $('#newQuantity').val();
    let origin  = window.location.origin;

    let infoJson = JSON.stringify({
        'bill':billToChange,
        'quantity':newQuantity
    });

    $.ajax({
        type: "POST",
        url: origin + '/admin/getResources',
        contentType: "application/json; charset=utf-8",
        data: infoJson,
        dataType: "json",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                setQuantities(this.response.data);
                $('#newQuantity').val('');
                $('#modalAlertOperationSuccess').modal('show');
            }
            else{
                if(this.response.message === "Cantidad no valida"){
                    $('#errorWrongQuantityAdmin').modal('show');
                }
                else{
                    $('#modalErrorFail').modal('show');
                }
                
                if(this.response.message == "UNATHORIZED"){
                    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }            }
        }
    });
}