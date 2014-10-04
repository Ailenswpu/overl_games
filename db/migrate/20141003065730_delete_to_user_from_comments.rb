class DeleteToUserFromComments < ActiveRecord::Migration
  def change
  	add_column :comments, :user_id, :integer, null: false, index:true
  end
end
