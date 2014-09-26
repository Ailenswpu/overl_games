class RegistrationsController < ApplicationController
  layout 'before_app'
  
  skip_before_action :authenticate_user!

  def new
    @user = User.new
  end 
  
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to new_session_path
    else
      render :new
    end
  end 
  
  def confirmation
    notice, confirmation_success = UserService.confirmation confirmation_params
    if confirmation_success
      redirect_to root_path
    else
      redirect_to sign_up_path
    end
  end
  
  private 
  
  def user_params
    params.required(:user).permit(:email, :password, :password_confirmation, :name)
  end

  def confirmation_params
    params.required(:confirmation_token)
  end
end
