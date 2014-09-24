class User < ActiveRecord::Base
  attr_accessor :password_confirmation, :password
  validates :email, presence: true, uniqueness: true, email: true
  validates :password, presence: true, length: { minimum: 6, maximum: 64 }, on: :create
  validates :name, presence: true, uniqueness: true, length: { minimum: 4, maximum: 64 }
  validates :password_confirmation, presence: true, length: { minimum: 6, maximum: 64 }, on: :create
  validates_confirmation_of :password, on: :create
  
  before_create :encryptable
  after_create :send_confirmation_email
  
  def password_salt
    SecureRandom.hex(16)
  end
  
  def valid_password? password
    PasswordUtils.check?(password, self.encrypted_password)
  end

  def generate_token
    SecureRandom.urlsafe_base64(30).tr('_-', 'xx')
  end
  
  def reset_password password
    self.encrypted_password = Bitmain.digest(password, self.password_salt)
    self.source = 0
    self.save!
  end

  def generate_confirmation_token
    User.transaction do
      begin
        begin
          self.confirmation_token = self.generate_token
        end while User.where(confirmation_token: self.confirmation_token).any?
        self.save!
      rescue Exception => e
        raise ActiveRecord::Rollback
      end
    end
  end

  def generate_reset_password_token
    User.transaction do
      begin
        begin
          self.reset_password_token = self.generate_token
        end while User.where(reset_password_token: self.reset_password_token).any?
        self.save!
      rescue Exception => e
        raise ActiveRecord::Rollback
      end
    end
  end
  
  private
  
  def encryptable
    self.encrypted_password = PasswordUtils.digest(self.password, self.password_salt)
  end

  def send_confirmation_email
    AccountMailer.confirmation_email(self.id).deliver
  end
end
