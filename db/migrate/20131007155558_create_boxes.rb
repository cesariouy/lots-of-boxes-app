class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.string :title, null: false
      t.string :key_digest
      t.string :type, null: false

      t.timestamps
    end

    add_index :boxes, :title
    add_index :boxes, :type
  end
end
