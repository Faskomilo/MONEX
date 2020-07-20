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
    $('#modalAlert').modal('show');
  }
  else{
    $('#modalErrorUser').modal('show');
  }
}
