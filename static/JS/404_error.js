$(document).ready(function(){
    
    $('#goToIndex').click(function(){
      var origin  = window.location.origin;
      window.location.replace(origin + "/MONEX/index");
    });
  });