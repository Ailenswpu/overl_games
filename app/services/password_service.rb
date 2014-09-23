module PasswordService
  class << self
    def send_reset_email user
      AccountMailer.reset_password_email @user.id
    end

    def validates_password_token password_token
      user = User.where(reset_password_token: password_token).first
      if user
        if (user.reset_password_sent_at + 3.hours) < Time.now
          return I18n.t('devise.errors.messages.expired'), nil
        else
          user.generate_reset_password_token
          @confirmation_success = user.save
          return I18n.t('devise.passwords.verify'), @confirmation_success, user
        end
      else
        return I18n.t('devise.passwords.no_token'), nil
      end
    end
  end
end