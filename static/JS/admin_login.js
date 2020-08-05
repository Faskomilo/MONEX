vbSound = true;
responsiveVoice.setDefaultVoice("Spanish Latin American Female");

$(document).ready(function(){
    if(vbSound == true){
      responsiveVoice.speak("Bienvenido o bienvenida al modo administrador, inicia sesión para acceder a las herramientas del modo administrador, presiona en volver a la máquina de cambio para regresar a la página principal.","Spanish Latin American Female");
    }

    $('#goToIndex').click(function(){
      var origin   = window.location.origin;
      window.location.replace(origin + "/monex/index");
    });

    $('#botAnswer').click(function(){
      responsiveVoice.speak("Bienvenido o bienvenida al modo administrador, inicia sesión para acceder a las herramientas del modo administrador, presiona en volver a la máquina de cambio para regresar a la página principal.");
    });

    $('#inputUser').focus(function(){
      $('#errorEmptyUser').hide();
      $('#errorEmptyPasword').hide();
      $("#errorInvalidCredentials").hide();
    });

    $('#inputPasword').focus(function(){
      $('#errorEmptyUser').hide();
      $('#errorEmptyPasword').hide();
      $("#errorInvalidCredentials").hide();
    });

    $(document).keypress(function(e){
      if(e.keyCode==13)
      $('#logContinue').click();
    });

    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
  
  function continueLog(){
    if($('#inputUser').val() == '' && $('#inputPasword').val() != ''){
      $('#errorEmptyUser').show();

      if(vbSound == true){
        responsiveVoice.speak("Error, favor de ingresar un nombre de usuario");
      }
    }
    else{
      $('#errorEmptyUser').hide();
    }
    if($('#inputPasword').val() == '' && $('#inputUser').val() != ''){
      $('#errorEmptyPasword').show();

      if(vbSound == true){
        responsiveVoice.speak("Error, favor de ingresar una contraseña");
      }
    }
    else{
      $('#errorEmptyPasword').hide();
    }

    if($('#inputUser').val() != '' && $('#inputPasword').val() != ''){
      let username = $('#inputUser').val();
      let password = $('#inputPasword').val();
      
      let infoJson = JSON.stringify({
        'username' : username,
        'password' : password
      });

      $.ajax({
        type: "POST",
        url: origin + '/login/login',
        contentType: "application/json; charset=utf-8",
        data: infoJson,
        dataType: "json",
        success: function(response){
          this.response = response;
          if(this.response.success === "ok"){

            if(this.response.message === "login ok"){
              window.location.replace(origin +"/"+ this.response.data.redirect);
              document.cookie = "SID = " + this.response.data.cookie.SID;
            }
          }
          else{
            $('#errorInvalidCredentials').show();

            if(vbSound == true){
              responsiveVoice.speak("Error, inicio de sesión no válido, intenta con otro usuario y contraseña");
            }
          }
        }
      })
    }
    else if($('#inputUser').val() == '' && $('#inputPasword').val() == ''){
      if(vbSound == true){
        responsiveVoice.speak("Error, favor de ingresar un nombre de usuario y contraseña.");
      }
      
      $('#errorEmptyUser').show();
      $('#errorEmptyPasword').show();
    }
  }
  