class SubscriptionsController < ApplicationController
  def create
    if Subscription.create(subscription_params)
      redirect_to :root
    else
      flash[:notice] = "请输入正确的邮箱"
      redirect_to :root
    end
  end
  
  private
  
  def subscription_params
    params.require(:subscription).permit(:email)
  end
end
