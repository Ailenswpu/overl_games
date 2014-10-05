# encoding: utf-8
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  helper_method :current_user, :user_signed_in?
  
  before_action :authenticate_user!, except: [:index, :new, :show]
  
  

  private
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]      
  end
  
  def authenticate_user!
    redirect_to new_session_path if !current_user
  end
  
  def user_signed_in?
    !!current_user
  end
  
  def sign_in user
    session[:user_id] = user.id
    @current_user = user
  end
  
  def log_out
    session.delete(:user_id)
    @current_user = nil
  end
end
