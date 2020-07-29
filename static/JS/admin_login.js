$(document).ready(function(){

    $('#goToIndex').click(function(){
      var origin   = window.location.origin;
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

    if($('#inputUser').val() != '' && $('#inputPasword').val() != ''){
      let username = $('#inputUser').val();
      let password = $('#inputPasword').val();
      
      let infoJson = JSON.stringify({
        'username' : username,
        'password' : password
      });

      let origin  = window.location.origin;

      $.ajax({
        type: "POST",
        url: origin + '/login/login',
        contentType: "application/json; charset=utf-8",
        data: infoJson,
        dataType: "json",
        success: function(response){
          console.log(response)
          this.response = response;
          if(this.response.success === "ok"){

          }
          else{
            console.log("Error");
          }
        }
      })
    }
  }
  