class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.integer :from, null: false
      t.integer :to, null: false

      t.timestamps
    end

    add_index :contacts, :from
    add_index :contacts, :to
  end
end
