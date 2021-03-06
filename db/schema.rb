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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131015203001) do

  create_table "box_memberships", :force => true do |t|
    t.integer  "box_id",     :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "box_memberships", ["box_id"], :name => "index_box_memberships_on_box_id"
  add_index "box_memberships", ["user_id"], :name => "index_box_memberships_on_user_id"

  create_table "boxes", :force => true do |t|
    t.string   "title",      :null => false
    t.string   "key_digest"
    t.string   "type",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "boxes", ["title"], :name => "index_boxes_on_title"
  add_index "boxes", ["type"], :name => "index_boxes_on_type"

  create_table "contacts", :force => true do |t|
    t.integer  "from",       :null => false
    t.integer  "to",         :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "contacts", ["from"], :name => "index_contacts_on_from"
  add_index "contacts", ["to"], :name => "index_contacts_on_to"

  create_table "posts", :force => true do |t|
    t.integer  "box_id",     :null => false
    t.integer  "user_id"
    t.integer  "post_id"
    t.text     "body"
    t.text     "link"
    t.string   "signature",  :null => false
    t.string   "align",      :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "posts", ["box_id"], :name => "index_posts_on_box_id"
  add_index "posts", ["post_id"], :name => "index_posts_on_post_id"
  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "password_digest", :null => false
    t.string   "session_token",   :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
