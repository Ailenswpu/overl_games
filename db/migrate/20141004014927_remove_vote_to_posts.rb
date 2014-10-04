class RemoveVoteToPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :vote, :integer
    remove_column :posts, :visit, :integer
  end
end
