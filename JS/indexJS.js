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
