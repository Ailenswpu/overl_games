class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.references :post, index: true, null: false
      t.references :user, index: true, null: false

      t.timestamps
    end
  end
end
