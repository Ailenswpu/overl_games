class VotesController < ApplicationController
  before_action :set_post

  def create
    @vote = Vote.where(user_id: current_user.id, post_id: vote_params[:post_id]).first
    if @vote.nil?
      @post.votes << Vote.create!(user_id: current_user.id)
      @post.reload
      render :json => {result:@post.votes_count}
    else
        if @vote.destroy!
          @post.reload
          render :json => {result: @post.votes_count}
        end
    end
  end

  private

  def set_post
   @post = Post.find(vote_params[:post_id])
  end

  def vote_params
    params.require(:vote).permit(:post_id )
  end
end
