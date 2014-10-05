class RemoveCategoryToPosts < ActiveRecord::Migration
  def change
  	remove_column :posts, :category, :integer
  	add_column :posts, :category_id, :integer, null: false, index: true
  end
end
