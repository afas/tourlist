class CreateAutoCompleteCities < ActiveRecord::Migration
  def self.up
    create_table :auto_complete_cities do |t|
      t.integer :country_id, :null => false
      t.string :name, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :auto_complete_cities
  end
end
