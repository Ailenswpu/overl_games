$(document).ready(function(){
  var FooterHeight = $("#footer").height();
  var WinHeight = $(window).height();
  var temp = WinHeight-70-FooterHeight;
  $('#main-window').css("min-height",temp);
});