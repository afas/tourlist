class CreatePrivatSpaces < ActiveRecord::Migration
  def self.up
    create_table :privat_spaces do |t|
      t.string :contact
      t.string :phone
      t.string :email
      t.text :note

      t.timestamps
    end
  end

  def self.down
    drop_table :privat_spaces
  end
end
