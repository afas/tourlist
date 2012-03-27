class RenameCountryColumnInCities < ActiveRecord::Migration
  def self.up
    rename_column :auto_complete_cities, :country_id, :auto_complete_country_id
  end

  def self.down
    rename_column :auto_complete_cities, :auto_complete_country_id, :country_id
  end
end
