# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$ ->
  $(document).on "click","[data-postmodal-id]", get_post_data
  $(document).on "click","#post-frame-bg", iframe_close

get_post_data = ->
  post_id =  $(this).data("postmodal-id")
  iframe_open()
  window.frames['framename'].location.href = "/modal_show/"+post_id

iframe_open = ->
  $("#post-frame-bg").show()
  $("#post-frame-bg").animate({
    opacity:'0.5',
    filter:'alpha(opacity=50)'
    })
  $("#post-frame").animate({
    display:'block',
    width:'50%'
  });
  $("body.comon_body").animate({
    'padding-right':'100px'
  });
  $("body.comon_body").css('overflow','hidden')

  
iframe_close = ->
  $("#post-frame").animate({width:'0%'})
  $("#post-frame-bg").animate({
    opacity:'0',
    filter:'alpha(opacity=0)'
    })
  $("#post-frame-bg").hide()
  $("body.comon_body").animate({
    'padding-right':'0'
  });
  $("body.comon_body").css('overflow','auto')