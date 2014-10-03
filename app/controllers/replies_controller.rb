class RepliesController < ApplicationController

  def create
    @reply = Reply.new(reply_params)
    @reply.user = current_user
    if @reply.save
      render :json => { :content => @reply.content, 
                                    :id => @reply.id, 
                                    :user_id => @reply.user.id,
                                    :user_name => @reply.user.try(:name),
                                    :user_avatar => @reply.user.try(:avatar),
                                    :created_at => @reply.created_at,
                                    :comment_id => @reply.comment.id
                                  }.to_json
    else
      render :json => @reply.errors
    end
  end

   private
    def reply_params
      params.require(:reply).permit(:content,:comment_id)
    end
end
