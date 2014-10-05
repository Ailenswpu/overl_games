# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141005015716) do

  create_table "categories", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.text     "content"
    t.integer  "post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",    null: false
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree

  create_table "posts", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "icon_file_name"
    t.string   "icon_content_type"
    t.integer  "icon_file_size"
    t.datetime "icon_updated_at"
    t.integer  "user_id",           null: false
    t.integer  "category",          null: false
    t.string   "ios"
    t.string   "android"
    t.string   "windows"
    t.string   "web"
  end

  create_table "replies", force: true do |t|
    t.text     "content"
    t.integer  "comment_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "replies", ["comment_id"], name: "index_replies_on_comment_id", using: :btree
  add_index "replies", ["user_id"], name: "index_replies_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "provider",         null: false
    t.string   "uid",              null: false
    t.string   "name",             null: false
    t.string   "avatar"
    t.string   "oauth_token",      null: false
    t.datetime "oauth_expires_at", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "votes", force: true do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["post_id"], name: "index_votes_on_post_id", using: :btree
  add_index "votes", ["user_id"], name: "index_votes_on_user_id", using: :btree

end
