const sound = new Audio();

$(document).ready(function(){
    getQuantities();

//////////////////////////////////////btn Audios///////////

    $('#btnOperationSuccess').click(function(){
        sound.pause();
        sound.src = '/static/contents/voicebot/admin_resourcesSuccess.wav';
        sound.play();
    });

    $('#btnAlertWantContinue').click(function(){
        sound.pause();
        sound.src = '/static/contents/voicebot/admin_resourcesConfirmModify.wav';
        sound.play();
    });

    $('#btnErrorWrongQuantity').click(function(){
        sound.pause();
        sound.src = '/static/contents/voicebot/admin_errorQuantityOutOfRange.wav';
        sound.play();
    });

    $('#btnErrorChose').click(function(){
        sound.pause();
        sound.src = '/static/contents/voicebot/monex_errorChoseQuantity.wav';
        sound.play();
    });

    $('#btnErrorNewQuantity').click(function(){
        sound.pause();
        sound.src = '/static/contents/voicebot/admin_errorResourcesNewDenomination.wav';
        sound.play();
    });

    $('#btnErrorSystem').click(function(){
        sound.pause();
        sound.src = '/static/contents/voicebot/error_systemFailure.wav';
        sound.play();
    });
});

function changeQuantity(){
    if($('.radio_button').is(':checked') && $('#newQuantity').val() != ''){
        $('#modalAlertContinue').modal('show');
        var myCookie = getCookie("voiceBot");
        if(myCookie == null){
            sound.pause();
            sound.src = '/static/contents/voicebot/admin_resourcesConfirmModify.wav';
            sound.play();
        }
    }
    else if($('#newQuantity').val() == ''){
        $('#modalErrorNewQuantity').modal('show');
        $('#newQuantity').val('');
        var myCookie = getCookie("voiceBot");
        if(myCookie == null){
            sound.pause();
            sound.src = '/static/contents/voicebot/admin_errorResourcesNewDenomination.wav';
            sound.play();
        }
    }
    else{
        $('#modalErrorChoose').modal('show');
        var myCookie = getCookie("voiceBot");
        if(myCookie == null){
            sound.pause();
            sound.src = '/static/contents/voicebot/monex_errorChoseQuantity.wav';
            sound.play();
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
                    sound.pause();
                    sound.src = '/static/contents/voicebot/admin_resourcesSuccess.wav';
                    sound.play();
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
                        sound.pause();
                        sound.src = '/static/contents/voicebot/admin_errorQuantityOutOfRange.wav';
                        sound.play();
                    }
                }
                else{
                    $('#modalErrorFail').modal('show');

                    var myCookie = getCookie("voiceBot");
                    if(myCookie == null){
                        sound.pause();
                        sound.src = '/static/contents/voicebot/error_systemFailure.wav';
                        sound.play();
                    }
                }
            }
        }
    });
}

function playVB(){
    sound.pause();
    sound.src = '/static/contents/voicebot/admin_resources.wav';
    sound.play();
}