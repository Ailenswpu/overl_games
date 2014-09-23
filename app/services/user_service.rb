module UserService
  class << self
    def check_username_and_email params
      User.where(params).first
    end

    def confirmation confirmation_token
      user = User.where(confirmation_token: confirmation_token).first
      if user
        unless user.confirmed_at
          if (user.confirmation_sent_at + 3.hours) < Time.now
            return I18n.t('devise.errors.messages.expired'), nil
          else
            user.confirmed_at = Time.now
            @confirmation_success = user.save
          end
        end
        return I18n.t('devise.confirmations.confirmed'), @confirmation_success
      else
        return I18n.t('devise.passwords.no_token'), nil
      end
    end

    def reset_password reset_password_params, user
      if reset_password_params[:password].eql?(reset_password_params[:password_confirmation])
        if reset_password_params[:password].size >= 6
          return I18n.t("devise.passwords.reset_successfuly"), user.reset_password(reset_password_params[:password])
        else
          return I18n.t('devise.passwords.too_short')
        end
      else
        return I18n.t('devise.passwords.no_confirm')
      end
    end

    def change_password user, change_password_params
      if user.valid_password? change_password_params[:old_password]
        return reset_password change_password_params, user
      else
        return I18n.t('devise.passwords.no_match')
      end
    end

    def security_question user, security_question_params
      answer = user.answer
      if answer
        if answer.question_id.eql?(security_question_params[:question_id].to_i) and answer.answer.eql?(security_question_params[:answer])
          return I18n.t('security_question.unlock'), answer.delete
        else
          return I18n.t('security_question.errors.answer')
        end
      else
        answer = Answer.create(user_id: user.id, question_id: security_question_params[:question_id], answer: security_question_params[:answer])
        return I18n.t('security_question.create_successfully'), answer
      end
    end

    def google_auth user, google_auth_params
      user_google_auth = user.google_auth
      if user_google_auth.verify(google_auth_params[:google_code])
        if user_google_auth.activated
          user_google_auth.refresh
          user_google_auth.activated = false
          @notice = I18n.t('google_auth.un_activated')
        else
          user_google_auth.activated = true
          @notice = I18n.t('google_auth.activated')
        end
        return @notice, user_google_auth.save
      else
        return I18n.t('google_auth.verify_filed')
      end
    end

  end
end