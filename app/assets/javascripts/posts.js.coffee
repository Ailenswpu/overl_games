# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$ ->
  $(document).on "click","[data-postmodal-id]", get_post_data_show
  $(document).on "click","[data-comemnts-id]", get_post_comemnts_show
  $(document).on "click","#post-frame-bg", iframe_close
  $(document).on "click","#update_post_by_date", post_update_by_date
  # $(document).on "click","[data-share]", change_sharebox
  post_update_by_date()

get_post_comemnts_show = ->
  post_id =  $(this).data("comemnts-id")
  window.frames['framename'].location.href = "/modal_show/"+post_id+"/#comments"
  iframe_open()
  


get_post_data_show = ->
  post_id =  $(this).data("postmodal-id")
  window.frames['framename'].location.href = "/modal_show/"+post_id
  iframe_open()
  
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


post_update_by_date =  ->
  if $("#update_post_by_date").length
    date = $("#update_post_by_date").attr("value")
    $.ajax
      url: "/update_post_by_date"
      data: "date="+date
      type: 'GET'  
      dataType: 'html'  
      error: (jqXHR, textStatus, errorThrown) ->  
          # alert("error")
      success: (data, textStatus, jqXHR) -> 
          display_updated_posts("#{data}")

display_updated_posts = (data) ->
  json_str = jQuery.parseJSON(data)
  if json_str.length > 0
    $("#update_post_by_date").attr("value",json_str[0].created_at)
    html_str = "
    <div class='row home-floor' style='display:none;'' data-floor-id='"+json_str[0].created_at+"'>
    <p class='floot-title'>-&nbsp;&nbsp;"+json_str[0].created_at+"&nbsp;&nbsp;-</p>
    <div class='col-lg-12'>
      <div class='row' data-floor-content="+json_str[0].created_at+">
        </div></div></div>
        "
    $("#data-next-date").before(html_str)
    $("[data-floor-id="+json_str[0].created_at+"]").fadeIn()
    for data in json_str
      post_element(data)
  else
    post_element_end()

post_element = (data) ->
  html_str = 
    "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 post-box' data-post-box-id='"+data.id+"' style='display:none;'>
      <div class='tile post-index'>
      <h6>"+data.title+"</h6>
      <p>"+data.description+"</p>
      <img alt='"+data.title+"' class='tile-image' data-postmodal-id='"+data.id+"' src='"+data.icon+"'>
      <div class='over-post-index'>
      <a href='/posts/"+data.id+"' style='margin-left:10px;'' target='_blank' title='Show'>
      <span class='fui-resize'></span>
      </a>
      <a data-vote-id='"+data.id+"' style='margin-left:10px;cursor:pointer;'' title='Chan'>
      <span class='fui-star-2'></span>(<font data-votescount-id='"+data.id+"'>"+data.votes_count+"</font>)
      </a>
      <a style='margin-left:10px;' data-comemnts-id='"+data.id+"' title='Comments'>
      <span class='fui-bubble'></span>(<font>"+data.comments_count+"</font>)
      </a>
      </div>
      <div class='over-post-tag'>
      <font>"+data.category+"</font>
      </div>
      </div>
      </div>"
  $("[data-floor-content="+data.created_at+"]").append(html_str)
  $("[data-post-box-id="+data.id+"]").fadeIn()

post_element_end = ->
  $("#data-next-date").hide()
  $("#end").fadeIn()

# change_sharebox = ->
#   if $("#data-share-box").hide()
#     $("#data-share-box").fadeIn()
#   else
#     $("#data-share-box").fadeOut()
# $(window).scroll ->
#   scrollTop = $(this).scrollTop()
#   winHeight = $(window).clientHeight 
#   pageHeght = $(document).height()
#   if scrollTop+winHeight == pageHeght
#     alert("update")
#     post_update_by_date