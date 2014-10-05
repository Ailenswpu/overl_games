class Post < ActiveRecord::Base
  #[ '动作游戏', '探险游戏', '街机游戏' , '桌面游戏', '扑克牌游戏' , '娱乐场游戏', '骰子游戏', '教育', '家庭游戏', '儿童', '音乐', '智力游戏' , '赛车游戏', '角色扮演游戏', '模拟游戏', '体育', '策略游戏', '小游戏', '文字游戏' ] 
  has_attached_file :icon, presence: true,:styles => { :medium => "300x300>"}
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/
  validates_presence_of :icon, :title, :description, :category
  validates_format_of :ios, :android, :windows, :web, with: /https?:\/\/[\S]+/, allow_nil: true, allow_blank: true, message: "请输入正确的url格式"

  has_many :comments
  has_many :votes
  belongs_to :user
  
  def add_visit
    update_attributes!(visit: visit + 1)
  end
end
