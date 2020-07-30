$(document).ready(function(){

    $('#goToIndex').click(function(){
      var origin   = window.location.origin;
      window.location.replace(origin + "/monex/index");
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

  });
  
  function mute(){
    $('#botMute').show();
    $('#botUnmute').hide();
  }
  
  function unmute(){
    $('#botMute').hide();
    $('#botUnmute').show();
  }
  
  function continueLog(){
    if($('#inputUser').val() == ''){
      $('#errorEmptyUser').show();
    }
    else{
      $('#errorEmptyUser').hide();
    }
    if($('#inputPasword').val() == ''){
      $('#errorEmptyPasword').show();
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
              window.location.replace(this.response.data.redirect);
            }
          }
          else{
            $('#errorInvalidCredentials').show();
          }
        }
      })
    }
  }
  