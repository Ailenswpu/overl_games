class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.text :content
      t.references :comment, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
