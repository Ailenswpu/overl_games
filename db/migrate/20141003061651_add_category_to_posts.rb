class AddCategoryToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :category, :integer, null: false, index: true
  end
end
