class DeleteToUserFromComments < ActiveRecord::Migration
  def change
  	remove_column :comments, :to_user
  	remove_column :comments, :commenter
  	add_column :comments, :user_id, :integer, null: false, index:true
  end
end
