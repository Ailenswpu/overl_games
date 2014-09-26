$(window).scroll ->
  if $(window).scrollTop() <= 0
    $('#home_top_nav').fadeOut()
  else
    $('#home_top_nav').fadeIn()
