class AccountMailer < ActionMailer::Base
  default from: Settings.smtp.sender
  include Sidekiq::Mailer
  sidekiq_options queue: 'account_email', retry: 'true'

  def confirmation_email(user_id)
    @user = User.find(user_id)
    @user.confirmation_sent_at = Time.now
    @user.generate_confirmation_token
    mail(to: @user.email, subject: I18n.t("devise.mailer.confirmation_instructions.subject"))
  end

  def reset_password_email(user_id)
    @user = User.find(user_id)
    @user.reset_password_sent_at = Time.now
    @user.generate_reset_password_token
    mail(to: @user.email, subject: I18n.t("devise.mailer.reset_password_instructions.subject"))
  end
end
