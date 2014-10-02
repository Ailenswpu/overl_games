$ ->
  $(document).on "click","a[data-comment-id]",new_reply_form
  $(document).on "click","button[data-current_submit]",new_reply_content
  $(document).on "click","#submit-comment",submit_comment

  #key ctrl+enter
  document.onkeydown = ->
    oEvent = window.event; 
    if (oEvent.keyCode == 13 && oEvent.ctrlKey)
      control_id = document.activeElement.id
      if control_id == "comment-content"
        new_comment()
      else if control_id == "current_reply_content"
        new_reply_content()
      


new_reply_content =  ->
    text = $("div#current_reply_content").html()
    if text == ""
      $("#current_tip").html("Couldn't be Null")
      return false
    else
      sendComment()
      comment_id = $("button#current_button").data("comment-id")
      user_id =$("button#current_button").data("user-id")
      html_str = "
      <div class='row comment-floor'>
        <div class='col-xs-2 col-sm-1 col-md-1 col-lg-1 comment-left'>
          <img class='comment-avatar' src='http://www.aabar.me/assets/third_section/qq.png'>
            </div>
        <div class='col-xs-10 col-sm-11 col-md-11 col-lg-11 comment-right'>
          <div class='comment-content'>
            <p class='tip'>
              <font>tuoxiaozhong</font>
              <font>#"+user_id+"</font>&nbsp;&nbsp;&nbsp;&nbsp;
              <font>3 months ago</font>
              <a class='pull-right' data-comment-id='"+comment_id+"' data-user-id='"+user_id+"'>
                <span class='fui-bubble'></span>
                  </a>
                  </p>
                  <p>
                  "+text+"
                  </p></div></div></div>"
      $("div[data-content-comment= '"+comment_id+"']").append(html_str)
      $("div[data-current_reply]").remove()
      return true

submit_comment =  ->
  text = $("#comment-content").html()
  if text == ""
    $("#comment-tip").html("Couldn't be Null") 
    return false
  else
    sendComment(text)
    return true

new_reply_form =  ->
  comment_id = $(this).data("comment-id")
  user_id = $(this).data("user-id")
  $("div[data-current_reply]").remove()
  html_str = "
  <div class='row comment-floor' data-current_reply='current_reply'>
    <div class='col-xs-2 col-sm-1 col-md-1 col-lg-1 comment-left'>
      <img class='comment-avatar' src='"+getUserAvatar(user_id)+"'>
    </div>
    <div class='col-xs-10 col-sm-11 col-md-11 col-lg-11 comment-right'>
        <div class='comment-input' contenteditable='true' id='current_reply_content'></div>
          <div class='comment-control'>
            <font id='current_tip'>@"+getUserName(user_id)+"</font>
            <button class='btn btn-inverse btn-post pull-right' id='current_button' data-current_submit='current_submit' data-comment-id='"+comment_id+"' data-user-id='"+user_id+"'>Reply</button>
              </div></div></div>"
  $("div[data-content-comment= '"+comment_id+"']").append(html_str)


sendComment = (text) ->
  displayComment()

displayComment = (json) ->
  current_user_id = 6
  new_comment_id = 6
  user_avatar = "http://www.aabar.me/assets/third_section/qq.png"
  html_str = "
      <div class='row comment-floor'>
        <div class='col-xs-2 col-sm-1 col-md-1 col-lg-1 comment-left'>
          <img class='comment-avatar' src='"+user_avatar+"'>
            </div>
            <div class='col-xs-10 col-sm-11 col-md-11 col-lg-11 comment-right' data-content-comment='6'>
              <div class='comment-content'>
                <p class='tip'>
                  <font>tuoxiaozhong</font>&nbsp;&nbsp;&nbsp;&nbsp;
                  <font>3-th floor</font>&nbsp;&nbsp;.&nbsp;&nbsp;
                  <font>Just now</font>
                  <a class='pull-right' data-comment-id='"+new_comment_id+"' data-user-id='"+current_user_id+"'>
                    <span class='fui-bubble'></span>
                      </a>
                  </p>
                <p>
                      "+text+"
                </p>
                </div>
                </div>
                </div>"
    $("#comment").after(html_str)
    $("#comment-content").html("")

getUserName = (user_id) ->
  return user_name

