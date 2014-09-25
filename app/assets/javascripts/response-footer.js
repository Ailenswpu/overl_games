container_height = 0;
$(window).resize(function() {
  	var FooterHeight = $("#footer").height();
	var WinHeight = $(window).height();
	container_height = WinHeight-70-FooterHeight;
	$('#main-window').css("min-height",container_height);
});