class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :json => { :content => @comment.content, 
        :id => @comment.id, 
        :user_id => @comment.user.id,
        :user_name => @comment.user.try(:name),
        :user_avatar => @comment.user.try(:avatar),
        :created_at => @comment.created_at
      }.to_json
    else
      render :json => @comment.errors
    end
  end

  private
  
  def comment_params
    params.require(:comment).permit(:user_id,:content,:post_id)#, :user_id, 
  end
end
