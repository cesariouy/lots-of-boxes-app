class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :box, null: false
      t.references :user
      t.references :post
      t.text :body, null: false
      t.string :link
      t.string :signature, null: false
      t.string :align, null: false

      t.timestamps
    end
    add_index :posts, :box_id
    add_index :posts, :user_id
    add_index :posts, :post_id
  end
end
