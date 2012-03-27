class CreateAutoCompleteCountries < ActiveRecord::Migration
  def self.up
    create_table :auto_complete_countries do |t|
      t.string :name, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :auto_complete_countries
  end
end
