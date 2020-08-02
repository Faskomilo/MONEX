$(document).ready(function(){
    getQuantitys();
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

function getQuantitys(){
    let origin  = window.location.origin;

    $.ajax({
        type: "POST",
        url: origin + '/admin/getResources',
        conectType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                ids = Object.keys(this.response.data);

                for(key in keys){
                    $('#quantity' + key).val(this.response.data[key]);
                }
            }
            else{
                console.log("error:: fallo al extraer cantidades");
            }
        }
    });
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
        conectType: "application/json; charset=utf-8",
        data: infoJson,
        dataType: "json",
        success: function(response){
            this.response = response;

            if(this.response.success === "ok"){
                getQuantitys();
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
            }
        }
    });
}