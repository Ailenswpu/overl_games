class SessionsController < ApplicationController
  layout 'before_app'
  skip_before_action :authenticate_user!
  
  def new
    @user = User.new
  end
  
  def create
    user = User.from_omniauth(auth_hash)
    sign_in user
    redirect_to :root
  end
  
  def destroy
    log_out
    redirect_to :root
  end
  
  private
  
  def auth_hash
    request.env['omniauth.auth']
  end
  
end
