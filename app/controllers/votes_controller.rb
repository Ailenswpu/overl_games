class VotesController < ApplicationController
  def create
    if Vote.where(user_id: current_user.id, post_id: vote_params[:post_id]).nil?
      @vote = Vote.new(vote_params)
      @vote.user_id = current_user.id
       #= Vote.create!(user_id: current_user.id, post_id: vote_params[:post_id])
      if @vote.save
        render :json => @vote
      end
    end
  end
  
  private
  
  def vote_params
    params.require(:vote).permit(:post_id )
  end
end
