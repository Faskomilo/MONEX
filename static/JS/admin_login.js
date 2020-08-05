const sound = new Audio();
vbSound = true;

$(document).ready(function(){
    if(vbSound == true){
      sound.pause();
      sound.src = '/static/contents/voicebot/login_documentReady.wav';
      sound.play();
    }

    $('#goToIndex').click(function(){
      var origin   = window.location.origin;
      window.location.replace(origin + "/monex/index");
    });

    $('#botAnswer').click(function(){
      sound.pause();
      sound.src = '/static/contents/voicebot/login_documentReady.wav';
      sound.play();
    });

    $('#inputUser').focus(function(){
      $('#errorEmptyUser').hide();
      $('#errorEmptyPasword').hide();
      $("#errorInvalidCredentials").hide();
    })

    $('#inputPasword').focus(function(){
      $('#errorEmptyUser').hide();
      $('#errorEmptyPasword').hide();
      $("#errorInvalidCredentials").hide();
    })

    $(document).keypress(function(e){
      if(e.keyCode==13)
      $('#logContinue').click();
    });

    document.cookie = 'SID =; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
  
  function continueLog(){
    if($('#inputUser').val() == ''){
      $('#errorEmptyUser').show();

      if(vbSound == true){
        sound.pause();
        sound.src = '/static/contents/voicebot/login_errorUsername.wav';
        sound.play();
      }
    }
    else{
      $('#errorEmptyUser').hide();
    }
    if($('#inputPasword').val() == ''){
      $('#errorEmptyPasword').show();

      if(vbSound == true){
        sound.pause();
        sound.src = '/static/contents/voicebot/login_errorPassword.wav';
        sound.play();
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
              sound.pause();
              sound.src = '/static/contents/voicebot/login_logFailed.wav';
              sound.play();
            }
          }
        }
      })
    }
    else if($('#inputUser').val() == '' && $('#inputPasword').val() == ''){
      if(vbSound == true){
        sound.pause();
        sound.src = '/static/contents/voicebot/login_errorUserPassword.wav';
        sound.play();
      }
    }
  }
  