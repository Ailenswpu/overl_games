class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user,:class_name => 'User', :foreign_key => "commenter"
  belongs_to :user,:class_name => 'User', :foreign_key => "to_user"
end
