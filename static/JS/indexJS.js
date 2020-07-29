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

  $.ajax({
    type: "POST",
    url: origin + '/monex/getChange',
    contentType: "application/json; charset=utf-8",
    data: infoJson,
    dataType: "json",
    success: function(response){
      console.log(response)
      this.response = response;
      if(this.response.success === "ok"){
        $('#divGivChange').append('<h4>'+ this.response.data.billsGiven +'</h4>');
      }
      else{
          console.log("Error");
      }
    }
  })

  $('#modalSuccessCambio').modal('show');
}

function showEnd(){
  $('#modalFin').modal('show');
}

function clearRB(){
  $('input[type="radio"]').prop('checked', false);
}
