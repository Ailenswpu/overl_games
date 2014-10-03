class Post < ActiveRecord::Base
  #[ '动作游戏', '探险游戏', '街机游戏' , '桌面游戏', '扑克牌游戏' , '娱乐场游戏', '骰子游戏', '教育', '家庭游戏', '儿童', '音乐', '智力游戏' , '赛车游戏', '角色扮演游戏', '模拟游戏', '体育', '策略游戏', '小游戏', '文字游戏' ] 
  PLATFORM = ['iOS', 'Android','WindowsPhone']
  has_attached_file :icon, presence: true,:styles => { :medium => "300x300>"}, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/
  validates_presence_of :icon, :title, :url, :description

  has_many :comments
  belongs_to :user

end
