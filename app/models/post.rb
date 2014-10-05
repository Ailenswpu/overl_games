class Post < ActiveRecord::Base
  #[ '动作游戏', '探险游戏', '街机游戏' , '桌面游戏', '扑克牌游戏' , '娱乐场游戏', '骰子游戏', '教育', '家庭游戏', '儿童', '音乐', '智力游戏' , '赛车游戏', '角色扮演游戏', '模拟游戏', '体育', '策略游戏', '小游戏', '文字游戏' ] 
  PLATFORM = ['iOS', 'Android','WindowsPhone']
  has_attached_file :icon, presence: true,:styles => { :medium => "300x300>"}
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/
  validates_presence_of :icon, :title, :description

  has_many :comments
  has_many :votes
  belongs_to :user
  belongs_to :category

  scope :find_by_day, -> (date) {where('created_at >= ? and created_at <= ?', date.at_beginning_of_day, date.at_end_of_day)}

  def as_json(options = {})
     super(only: [:id, :title ,:description,:icon_content_type]).merge({created_at: self.created_at.strftime("%Y-%m-%d")})
  end

end
