$ ->
  $(document).on "click","a[data-comment-id]",new_reply_form
  $(document).on "click","button[data-current_submit]",submit_reply
  $(document).on "click","#submit-comment",submit_comment

  #key ctrl+enter
  document.onkeydown = ->
    oEvent = window.event; 
    if (oEvent.keyCode == 13 && oEvent.ctrlKey)
      control_id = document.activeElement.id
      if control_id == "comment_content"
        submit_comment()
      else if control_id == "current_reply_content"
        submit_reply()
      
submit_comment =  ->
  text = $("#comment_content").html()
  if text == ""
    $("#comment-tip").html("Can't be empty") 
    return false
  else
    sendComment(text)
    return true

sendComment = (text) ->
  post_id = $("#comment").data("post-id")
  user_id = $("#comment").data("user-id")
  $.ajax
    url: "/comments"
    data: {comment:{content:text,post_id:post_id,user_id:user_id}}
    type: 'POST'  
    dataType: 'html'  
    error: (jqXHR, textStatus, errorThrown) ->  
        $("#comment-tip").html("error") 
    success: (data, textStatus, jqXHR) -> 
        displayComment("#{data}")

displayComment = (jsonStr) ->
  data = jQuery.parseJSON(jsonStr)
  #data.content
  user_avatar = "http://www.aabar.me/assets/third_section/qq.png"
  html_str = "
      <div class='row comment-floor' data-floor-id='"+data.id+"' style='display:none;'>
        <div class='col-xs-2 col-sm-1 col-md-1 col-lg-1 comment-left'>
          <img class='comment-avatar' src='"+data.user_avatar+"'>
            </div>
            <div class='col-xs-10 col-sm-11 col-md-11 col-lg-11 comment-right' data-content-comment='"+data.id+"'>
              <div class='comment-content'>
                <p class='tip'>
                  <font>"+data.user_name+"</font>&nbsp;&nbsp;&nbsp;&nbsp;
                  <font>"+data.created_at+"</font>
                  <a class='pull-right' data-comment-id='"+data.id+"' data-user-name='"+data.user_name+"'>
                    <span class='fui-bubble'></span>
                      </a>
                  </p>
                <p>
                      "+data.content+"
                </p>
                </div>
                </div>
                </div>"
  $("#comment").after(html_str)
  $("div[data-floor-id="+data.id+"]").fadeIn()
  $("#comment_content").html("")
    

new_reply_form =  ->
  user_avatar = $("#comment").data("user-avatar")
  comment_id = $(this).data("comment-id")
  user_id = $(this).data("user-id")
  user_name = $(this).data("user-name")
  $("div[data-current_reply]").remove()
  html_str = "
    <div class='row comment-floor' data-current_reply='current_reply' style='display:none;'>
    <div class='col-xs-2 col-sm-1 col-md-1 col-lg-1 comment-left'>
      <img class='comment-avatar' src='"+user_avatar+"'>
    </div>
    <div class='col-xs-10 col-sm-11 col-md-11 col-lg-11 comment-right'>
        <div class='comment-input' contenteditable='true' id='current_reply_content'></div>
          <div class='comment-control'>
            <font id='current_tip'>@"+user_name+"</font>
            <button class='btn btn-inverse btn-post pull-right' id='current_button' data-current_submit='current_submit' data-comment-id='"+comment_id+"' data-user-id='"+user_id+"'>Reply</button>
              </div></div></div>"
  $("div[data-content-comment= '"+comment_id+"']").append(html_str)
  $("div[data-current_reply=current_reply").fadeIn()
  $("#current_reply_content").focus()

submit_reply = ->
  text = $("div#current_reply_content").html()
  if text == ""
    $("#current_tip").html("Can't be empty")
    return false
  else
    send_reply(text)
    return true

send_reply = (text) ->
  comment_id = $("button#current_button").data("comment-id")
  $.ajax
    url: "/replies"
    data: {reply:{content:text,comment_id:comment_id}}
    type: 'POST'  
    dataType: 'html'  
    error: (jqXHR, textStatus, errorThrown) ->  
        $("#current_tip").html("error") 
    success: (data, textStatus, jqXHR) -> 
        new_reply_content("#{data}")

new_reply_content = (jsonStr)  ->
    data = jQuery.parseJSON(jsonStr)
    html_str = "
    <div class='row comment-floor' data-reply-id="+data.id+" style='display:none;'>
      <div class='col-xs-2 col-sm-1 col-md-1 col-lg-1 comment-left'>
        <img class='comment-avatar' src='"+data.user_avatar+"'>
          </div>
      <div class='col-xs-10 col-sm-11 col-md-11 col-lg-11 comment-right'>
        <div class='comment-content'>
          <p class='tip'>
            <font>"+data.user_name+"</font>
            <font>"+data.created_at+"</font>
                </p>
                <p>
                "+data.content+"
                </p></div></div></div>"
    #<a class='pull-right' data-comment-id='"+data.comment_id+"' data-user-id='"+data.user_id+"' data-user-name='"+data.user_name+"'>
    #<span class='fui-bubble'></span>
    #</a>
    $("div[data-content-comment= '"+data.comment_id+"']").append(html_str)
    $("div[data-reply-id="+data.id+"]").fadeIn()
    $("div[data-current_reply]").remove()