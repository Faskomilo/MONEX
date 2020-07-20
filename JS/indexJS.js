//MONEX_INDEX.HTML
$(document).ready(function(){
  $('#myModal').modal('show');
});

function mute(){
  $('#botMute').show();
  $('#botUnmute').hide();
}

function unmute(){
  $('#botMute').hide();
  $('#botUnmute').show();
}

function juasjuas(){
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

function showChange(){
  $('#modalSuccessCambio').modal('show');
}

function showEnd(){
  $('#modalFin').modal('show');
}

function clearRB(){
  $('input[type="radio"]').prop('checked', false);
}

//adminLog.HTML
function continueLog(){
  if($('#inputUser').val() == ''){
    $('#errorUser').show();
  }
  else{
    $('#errorUser').hide();
  }
  if($('#inputPasword').val() == ''){
    $('#errorPasword').show();
  }
  else{
    $('#errorPasword').hide();
  }
}
