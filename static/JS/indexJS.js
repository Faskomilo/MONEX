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

  $('#myModal').on('hidden.bs.modal', function (e) {
    sound.pause();
    sound.src = '/static/contents/voicebot/monex_selectButton.wav';
    sound.play();
  })
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
  }
  else{
    $('#modalErrorUser').modal('show');
  }
}

function newOperation(){
  $('#modalAlertLoop').modal('show');
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
      }
      else{
          console.log("Error");
      }
    }
  })

  $('#modalSuccessCambio').modal('show');
}

function showEnd(){
  $('#modalFin').modal('show');
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