class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, limit: 200,             null: false
      t.string :name, limit: 50,              null: false
      t.string :encrypted_password, limit: 200,             null: false
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :last_sign_in_ip

      t.timestamps
    end
  end
end
