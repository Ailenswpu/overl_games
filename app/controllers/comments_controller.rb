class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :json => @comment.to_json 
    else
      render :json => @comment.errors
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:commenter,:content,:post_id)#, :user_id, 
    end

end
