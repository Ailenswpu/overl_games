class User < ActiveRecord::Base
  validates_presence_of :provider, :uid, :name, :oauth_token, :oauth_expires_at
  
  has_many :posts
  has_many :replies
  has_many :comments
  has_many :votes

  def self.from_omniauth(auth)
    where(auth.slice(provider: auth.provider, uid: auth.uid.to_s)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.avatar = auth.info.image
      user.save!
    end
  end
end