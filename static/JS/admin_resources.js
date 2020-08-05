responsiveVoice.setDefaultVoice("Spanish Latin American Female");

$(document).ready(function(){
    getQuantities();

//////////////////////////////////////btn Audios///////////

    $('#btnOperationSuccess').click(function(){
        responsiveVoice.speak("Operación realizada éxitosamente");
    });

    $('#btnAlertWantContinue').click(function(){
        responsiveVoice.speak("¿Seguro que deseas modificar la cantidad de esa denominación?");
    });

    $('#btnErrorWrongQuantity').click(function(){
        responsiveVoice.speak("Cantidad ingresada incorrecta, asegúrate de que la cantidad ingresada esta dentro de los rangos establecidos en del sistema");
    });

    $('#btnErrorChose').click(function(){
        responsiveVoice.speak("Error, Favor de seleccionar una denominación.");
    });

    $('#btnErrorNewQuantity').click(function(){
        responsiveVoice.speak("Error, favor de ingresar una cantidad para la denominación seleccionada, únicamente valores numéricos positivos");
    });

    $('#btnErrorSystem').click(function(){
        responsiveVoice.speak("¡Oops!, Algo falló al realizar la operación, intentalo más tarde.");
    });
});

function changeQuantity(){
    if($('.radio_button').is(':checked') && $('#newQuantity').val() != ''){
        $('#modalAlertContinue').modal('show');
        var myCookie = getCookie("voiceBot");
        if(myCookie == null){
            responsiveVoice.speak("¿Seguro que deseas modificar la cantidad de esa denominación?");
        }
    }
    else if($('#newQuantity').val() == ''){
        $('#modalErrorNewQuantity').modal('show');
        $('#newQuantity').val('');
        var myCookie = getCookie("voiceBot");
        if(myCookie == null){
            responsiveVoice.speak("Error, favor de ingresar una cantidad para la denominación seleccionada, únicamente valores numéricos positivos");
        }
    }
    else{
        $('#modalErrorChoose').modal('show');
        var myCookie = getCookie("voiceBot");
        if(myCookie == null){
            responsiveVoice.speak("Error, Favor de seleccionar una denominación.");
        }
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
                if(this.response.message == "UNAUTHORIZED"){
                    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    document.location.replace(origin+"/monex/index")
                }    
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
                var myCookie = getCookie("voiceBot");
                if(myCookie == null){
                    responsiveVoice.speak("Operación realizada éxitosamente");
                }
            }
            else{
                if(this.response.message == "UNAUTHORIZED"){
                    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    document.location.replace(origin+"/monex/index")
                }          
                if(this.response.message === "INVALID NEW QUANTITY"){
                    $('#errorWrongQuantityAdmin').modal('show');
                    var myCookie = getCookie("voiceBot");
                    if(myCookie == null){
                        responsiveVoice.speak("Cantidad ingresada incorrecta, asegúrate de que la cantidad ingresada esta dentro de los rangos establecidos del sistema");
                    }
                }
                else{
                    $('#modalErrorFail').modal('show');

                    var myCookie = getCookie("voiceBot");
                    if(myCookie == null){
                        responsiveVoice.speak("¡Oops!, Algo falló al realizar la operación, intentalo más tarde.");
                    }
                }
            }
        }
    });
}

function playVB(){
    responsiveVoice.speak("Modificar recursos, aquí podrás modificar los recursos existentes de la máquina de cambio","Spanish Latin American Female");
}