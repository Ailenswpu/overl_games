module PasswordUtils
  class << self
    def digest(password, salt)
      str = [salt,password].flatten.compact.join
      "sha256$#{salt}$#{Digest::SHA256.hexdigest str}"
    end

    def check?(password, encrypted_password)
      salt = encrypted_password.split('$')[1]
      digest(password, salt).eql?(encrypted_password)
    end
  end
end