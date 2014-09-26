class SessionsController < ApplicationController
  layout 'before_app'
  skip_before_action :authenticate_user!
  
  def new
    @user = User.new
  end
  
  def create
    user = User.find_by_email(user_params[:email])
    if user && user.valid_password?(user_params[:password])
      if user.confirmed_at.nil?
        render json: '您的邮箱没有验证，请进行邮箱验证'
        # redirect_to new_session_path
      else
        sign_in user
        redirect_to root_path
      end
    else
      redirect_to new_session_path
    end
  end
  
  def destroy
    
  end
  
  private 
  
  def user_params
    params.required(:user).permit(:email, :password)
  end
  
end
