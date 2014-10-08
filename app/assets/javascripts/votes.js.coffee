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
        alert("Please login before vote.")
      success: (data, textStatus, jqXHR) -> 
        response_vote("#{data}",id)

response_vote = (jsonStr,id) ->
  data = jQuery.parseJSON(jsonStr)
  if data.cmd == "add"
    $("[data-vote-id="+id+"]").addClass("red")
  else if data.cmd == "minus"
    $("[data-vote-id="+id+"]").removeClass("red")
  $("[data-votescount-id="+id+"]").html(data.result)
