class AddStatusToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :status, :integer, null: false, default: 0, index: true
  end
end
