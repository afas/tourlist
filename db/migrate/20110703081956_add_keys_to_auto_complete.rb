class AddKeysToAutoComplete < ActiveRecord::Migration
  def self.up
    add_index :auto_complete_countries, :name, :unique => true
    add_index :auto_complete_cities, [:country_id, :name], :unique => true
  end

  def self.down
    remove_index :auto_complete_countries, :name
    remove_index :auto_complete_cities, [:country_id, :name]
  end
end
