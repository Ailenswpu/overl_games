# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  $(document).on "click","[data-vote-id]", vote

vote = ->
  id = $(this).data("vote-id")
  if id == null
    alert("no id")
  else
    $.ajax
      url: "/votes"
      data: {vote:{post_id: id}}
      type: 'POST'
      dataType: 'html'  
      error: (jqXHR, textStatus, errorThrown) ->  
        alert("ajax error")
      success: (data, textStatus, jqXHR) -> 
        alert("success")
        response_vote("#{data}")

response_vote = (jsonStr) ->
  alert(jsonStr)
  data = jQuery.parseJSON(jsonStr)