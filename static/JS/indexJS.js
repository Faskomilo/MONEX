//MONEX_INDEX.HTML
$(document).ready(function(){
    console.log("working js")
  $('#myModal').modal('show');

  $('#goToLogin').click(function(){
    var origin  = window.location.origin;
    window.location.replace(origin + "/admin/login");
  });

  $('#goToIndex').click(function(){
    var origin  = window.location.origin;
    window.location.replace(origin + "/monex/index");
  });
});

function mute(){
  $('#botMute').show();
  $('#botUnmute').hide();
}

function unmute(){
  $('#botMute').hide();
  $('#botUnmute').show();
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
  let quantity = document.querySelector('input[name="selectMoney"]:checked').value;

  let infoJson = JSON.stringify({
    'quantity' : quantity
  });

  let xhr = new XMLHttpRequest();
  let origin  = window.location.origin;
  xhr.open('POST', origin + '/monex/getChange');
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(infoJson);

  xhr.onload = function(){
    let respuesta = JSON.parse(xhr.responseText);
    console.log(respuesta);
  }

  $('#modalSuccessCambio').modal('show');
}

function showEnd(){
  $('#modalFin').modal('show');
}

function clearRB(){
  $('input[type="radio"]').prop('checked', false);
}
