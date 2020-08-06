//MONEX_INDEX.HTML
vbSound = true;
responsiveVoice.setDefaultVoice("Spanish Latin American Female");

$(document).ready(function(){
  responsiveVoice.speak("Bienvenido o Bienvenida a MONEX. Este sitio web está dedicado para realizar de forma fácil y segura el cambio de tu efectivo. Da click en el botón de Continuar para realizar una operación.","Spanish Latin American Female");

  $('#myModal').modal('show');

  $('#goToLogin').click(function(){
    var origin  = window.location.origin;
    window.location.replace(origin + "/admin/login");
  });

  $('#goToIndex').click(function(){
    var origin  = window.location.origin;
    window.location.replace(origin + "/monex/index");
  });

///////////////////////////////////////////////////////////////////////////////// Audios en botónes//////

  $('#myModal').on('hidden.bs.modal', function (e) {
    responsiveVoice.speak("Por favor, selecciona la cantidad que deseas cambiar.");
  });

  $('#modalEnd').click(function(){
    responsiveVoice.speak("Operación finalizada. La operación ha sido completada con éxito y sin ningún problema. Gracias por preferir usar MONEX. Presiona el botón de Inicio para ir a la pantalla de bienvenida o cierra la ventana.");
  });

  $('#btnErrorChooseQuantity').click(function(){
    responsiveVoice.speak("Error, Favor de seleccionar una cantidad.");
  });
  
  $('#btnAlertConfirmQuantity').click(function(){
    responsiveVoice.speak("¿Seguro que desea solicitar cambio de esa cantidad?");
  });

  $('#btnAlertLoop').click(function(){
    responsiveVoice.speak("¿Deseas realizar una nueva operación?");
  });

  $('#btnErrorNoChange').click(function(){
    responsiveVoice.speak("Lo sentimos, por el momento no disponemos de cambio para esa cantidad.");
  });

  $('#btnErrorFail').click(function(){
    responsiveVoice.speak("¡Oops!, Algo falló al realizar la operación, intentalo más tarde.");
  });

});

function mute(){
  $('#botMute').show();
  $('#botUnmute').hide();
  responsiveVoice.cancel();
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
      responsiveVoice.speak("¿Seguro que desea solicitar cambio de esa cantidad?");
    }
  }
  else{
    $('#modalErrorUser').modal('show');
    if(vbSound == true){
      responsiveVoice.speak("Error, Favor de seleccionar una cantidad.");
    }
  }
}

function newOperation(){
  $('#modalAlertLoop').modal('show');
  if(vbSound == true){
    responsiveVoice.speak("¿Deseas realizar una nueva operación?");
  }
}

let voiceChange = "";
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

        voiceChange = "";
        voiceChange = this.response.data.replace("<br/>","");

        if(vbSound == true){
          responsiveVoice.speak("operación éxitosa, tu cambio es de " + voiceChange);
        }

        $('#btnSuccessCambio').click(function(){
          console.log(voiceChange)
          responsiveVoice.speak("operación éxitosa, tu cambio es de " + voiceChange);
        });
      }
      else{

        if(this.response.message == "Not Enough Change"){
          $('#modalErrorNoChange').modal('show');
          if(vbSound == true){
            responsiveVoice.speak("Lo sentimos, por el momento no disponemos de cambio para esa cantidad.");
          }
        }
        else{

          $('#modalErrorFail').modal('show');
          if(vbSound == true){
            responsiveVoice.speak("¡Oops!, Algo falló al realizar la operación, intentalo más tarde.");
          }
        }
      }
    }
  });
}

function showEnd(){
  $('#modalFin').modal('show');
  if(vbSound == true){
    responsiveVoice.speak("Operación finalizada. La operación ha sido completada con éxito y sin ningún problema. Gracias por preferir usar MONEX. Presiona el botón de Inicio para ir a la pantalla de bienvenida o cierra la ventana.");
  }
}

function clearRB(){
  $('input[type="radio"]').prop('checked', false);
}

function playWellcomeSound(){
  responsiveVoice.speak("Bienvenido o Bienvenida a MONEX. Este sitio web está dedicado para realizar de forma fácil y segura el cambio de tu efectivo. Da click en el botón de Continuar para realizar una operación.");
}

function playSelect(){
  responsiveVoice.speak("Por favor, selecciona la cantidad que deseas cambiar y posteriormente pulsa el botón de continuar");
}
