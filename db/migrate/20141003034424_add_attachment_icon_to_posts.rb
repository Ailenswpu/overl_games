class AddAttachmentIconToPosts < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.attachment :icon
    end
  end

  def self.down
    remove_attachment :posts, :icon
  end
end
