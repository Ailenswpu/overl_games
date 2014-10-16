class SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(subscription_params)
    if @subscription.save
      flash[:alert] = "恭喜，订阅成功！"
      redirect_to :root
    else
      flash[:notice] = "您已经订阅过或者邮箱格式错误!"
      redirect_to :root
    end
  end
  
  private
  
  def subscription_params
    params.require(:subscription).permit(:email)
  end
end
