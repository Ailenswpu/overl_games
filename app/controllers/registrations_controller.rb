class RegistrationsController < ApplicationController
  def new
    
  end 
  
  def create
    
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
