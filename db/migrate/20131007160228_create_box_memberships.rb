class CreateBoxMemberships < ActiveRecord::Migration
  def change
    create_table :box_memberships do |t|
      t.references :box, null: false
      t.references :user, null: false

      t.timestamps
    end
    add_index :box_memberships, :box_id
    add_index :box_memberships, :user_id
  end
end
