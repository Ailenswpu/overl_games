module ApplicationHelper
	def current_user
          
	end

	def email_to_url(email)	
		domain = email.split("@")[1]
  		url = 'http://mail.' + domain + '/';
	end

end
