class AddBronniIdToCountries < ActiveRecord::Migration
  def self.up
    add_column :countries, :bronni_id, :integer
  end

  def self.down
    remove_column :countries, :bronni_id
  end
end
