# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$ ->
  $(document).on "click","[data-postmodal-id]", get_post_data
  $(document).on "click","#post-frame-bg", iframe_close
  $(document).on "click","#update_post_by_date", post_update_by_date
  

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


post_update_by_date =  ->
  date = $(this).data("date")
  $.ajax
    url: "/update_post_by_date"
    data: "date="+date
    type: 'GET'  
    dataType: 'html'  
    error: (jqXHR, textStatus, errorThrown) ->  
        alert("error")
        $("#current_tip").html("error") 
    success: (data, textStatus, jqXHR) -> 
        display_updated_posts(data)

display_updated_posts = (data) ->
  json_str = jQuery.parseJSON(data)
  


post_element = ->
  html_str = 
  "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 post-box'>
  <div class='tile post-index'>
    <h6>fdsaf</h6>
    <p>fdsafsa</p>
    <img alt='fdsaf' class='tile-image' data-postmodal-id='2' src='http://www.aabar.me/system/posts/icons/000/000/002/medium/mail.png?1412477458'>
    <div class='over-post-index'>
      <a title='View'>
        <span class='fui-eye' data-postmodal-id='2'></span>
      </a>
      <a href='/posts/2' style='margin-left:15px;'' target='_blank' title='Show'>
        <span class='fui-resize'></span>
      </a>
      <a href='#'' style='margin-left:15px;'' title='Chan'>
        <span class='fui-star-2'></span>
      </a>
      <a href='#'' style='margin-left:15px;' title='Share'>
        <span class='fui-export'></span>
      </a>
    </div>
    <div class='over-post-tag'>
      <span>街机游戏</span>
    </div>
  </div>
</div>"