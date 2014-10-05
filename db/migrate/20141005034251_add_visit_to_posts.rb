class AddVisitToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :visit, :integer, default: 0
  end
end
