class AddOrderToCountries < ActiveRecord::Migration
  def self.up
    add_column :countries, :country_order, :integer, :default => 0
  end

  def self.down
    remove_column :countries, :country_order
  end
end
