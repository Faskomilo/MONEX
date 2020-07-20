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
  }
