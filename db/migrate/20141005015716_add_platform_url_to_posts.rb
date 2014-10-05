class AddPlatformUrlToPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :platform, :string
    remove_column :posts, :url, :string
    add_column    :posts, :ios, :string
    add_column    :posts, :android, :string
    add_column    :posts, :windows, :string
    add_column    :posts, :web, :string
  end
end
