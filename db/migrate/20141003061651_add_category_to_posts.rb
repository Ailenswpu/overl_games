class AddCategoryToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :category_id, :integer, null: false, index: true
  end
end
