class VotesController < ApplicationController
  def create
    if Vote.where(user_id: current_user.id, post_id: vote_params[:post_id]).nil?
      Vote.create!(user_id: current_user.id, post_id: vote_params[:post_id])
    end
  end
  
  private
  
  def vote_params
    params.require(:vote).permit(:user_id, :post_id )
  end
end
