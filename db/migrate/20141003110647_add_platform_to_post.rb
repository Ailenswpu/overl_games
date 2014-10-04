class AddPlatformToPost < ActiveRecord::Migration
  def change
    add_column :posts, :platform, :string,  null: false, index: true, default: 'iOS'
    add_column :posts, :visit,    :integer, default: 0
    add_column :posts, :vote,     :integer, default: 0
  end
end
