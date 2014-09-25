$(window).scroll ->
  if $(window).scrollTop() <= 0
    $('#home_top_nav').removeClass('nav-bg')
  else
    $('#home_top_nav').addClass('nav-bg')
