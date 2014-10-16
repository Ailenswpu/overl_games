class Post < ActiveRecord::Base
  has_attached_file :icon, presence: true,:styles => { :medium => "300x300>"}
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/
  validates_presence_of :icon, :title, :description, :category
  validates_format_of :ios, :android, :windows, :web, with: /https?:\/\/[\S]+/, allow_nil: true, allow_blank: true, message: "请输入正确的url格式"
  validates_length_of :description, maximum: 400, message: "请输入小于400字符的描述"
  validates_uniqueness_of :title, :android, :ios, :windows, :web, allow_nil: true, allow_blank: true,
  message: "该游戏已经存在"
  scope :find_by_day, -> (date) {where('created_at >= ? and created_at <= ?', date.at_beginning_of_day, date.at_end_of_day)}

  has_many :comments
  has_many :votes
  belongs_to :user
  belongs_to :category
  
  def self.recent_post(date)
    if where('created_at <= ?', date.at_end_of_day).present?
      recent_posts = find_by_day(date)
      until recent_posts.present? do
        date = date - 1.day
        recent_posts = find_by_day(date)
      end
    end
    return recent_posts.nil? ? [] : recent_posts.where(status: 1)
  end

  def as_json(options = {})
    super(only: [:id, :title ,:description]).merge({
      created_at: self.created_at.strftime("%Y-%m-%d"), 
      icon: icon_url,
      category: category_name,
      votes_count: votes_count,
      comments_count: comments_count,
      })
    end
  
    def add_visit
      update_attributes!(visit: visit + 1)
    end

    def icon_url
      icon.url(:medium)
    end

    def category_name
      self.category.name
    end
  end
