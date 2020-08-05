//MONEX_INDEX.HTML
const sound = new Audio();
vbSound = true;

$(document).ready(function(){

  $('#myModal').modal('show');

  sound.src = '/static/contents/voicebot/monex_bienvenida.wav';
  sound.play();

  $('#myModal').on('shown.bs.modal', function (e) {
  })

  $('#goToLogin').click(function(){
    var origin  = window.location.origin;
    window.location.replace(origin + "/admin/login");
  });

  $('#goToIndex').click(function(){
    var origin  = window.location.origin;
    window.location.replace(origin + "/monex/index");
  });
///////////////////////////////////////////////////////////////////////////////// Audios //////
  $('#myModal').on('hidden.bs.modal', function (e) {
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_selectButton.wav';
    sound.play();
  });

  $('#btnSuccessCambio').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_change.wav';
    sound.play();
  });

  $('#modalEnd').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_end.wav';
    sound.play();
  });

  $('#btnErrorChooseQuantity').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_errorChoseQuantity.wav';
    sound.play();
  });
  
  $('#btnAlertConfirmQuantity').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_confirmQuantity.wav';
    sound.play();
  });

  $('#btnAlertLoop').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_newOperation.wav';
    sound.play();
  });

  $('#btnErrorNoChange').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_errorNoChange.wav';
    sound.play();
  });

  $('#btnErrorFail').click(function(){
    sound.pause();
    sound.src = '/static/contents/voicebot/error_systemFailure.wav';
    sound.play();
  });

});

function mute(){
  $('#botMute').show();
  $('#botUnmute').hide();
  sound.pause();
  vbSound = false;
}

function unmute(){
  $('#botMute').hide();
  $('#botUnmute').show();
  vbSound = true;
}

function continueChange(){
  if($('.radio_button').is(':checked'))
  {
    $('#modalAlertContinue').modal('show');
    if(vbSound == true){
      sound.pause();
      sound.src = '/static/contents/voicebot/monex_confirmQuantity.wav';
      sound.play();
    }
  }
  else{
    $('#modalErrorUser').modal('show');
    if(vbSound == true){
      sound.pause();
      sound.src = '/static/contents/voicebot/monex_errorChoseQuantity.wav';
      sound.play();
    }
  }
}

function newOperation(){
  $('#modalAlertLoop').modal('show');
  if(vbSound == true){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_newOperation.wav';
    sound.play();
  }
}

function getChange(){
  let billToExchange = document.querySelector('input[name="selectMoney"]:checked').value;

  let infoJson = JSON.stringify({
    'billToExchange' : billToExchange
  });

  $.ajax({
    type: "POST",
    url: origin + '/exchange/exchange',
    contentType: "application/json; charset=utf-8",
    data: infoJson,
    dataType: "json",
    success: function(response){
      this.response = response;
      
      if(this.response.success === "ok"){
        $('#divGivChange').html('<h4>'+ this.response.data +'</h4>');

        $('#modalSuccessCambio').modal('show');
        if(vbSound == true){
          sound.pause();
          sound.src = '/static/contents/voicebot/monex_change.wav';
          sound.play();
        }
      }
      else{

        if(this.response.message == "Not Enough Change"){
          $('#modalErrorNoChange').modal('show');
          if(vbSound == true){
            sound.pause();
            sound.src = '/static/contents/voicebot/monex_errorNoChange.wav';
            sound.play();
          }
        }
        else{

          $('#modalErrorFail').modal('show');
          if(vbSound == true){
            sound.pause();
            sound.src = '/static/contents/voicebot/error_systemFailure.wav';
            sound.play();
          }
        }
      }
    }
  });
}

function showEnd(){
  $('#modalFin').modal('show');
  if(vbSound == true){
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_end.wav';
    sound.play();
  }
}

function clearRB(){
  $('input[type="radio"]').prop('checked', false);
}

function playWellcomeSound(){
  sound.src = '/static/contents/voicebot/monex_bienvenida.wav';
  sound.play();
}

function playSelect(){
  sound.src = '/static/contents/voicebot/monex_selectButton.wav';
  sound.play();
}