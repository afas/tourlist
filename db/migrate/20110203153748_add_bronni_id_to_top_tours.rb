class AddBronniIdToTopTours < ActiveRecord::Migration
    def self.up
      add_column :top_tours, :bronni_id, :integer
    end

    def self.down
      remove_column :top_tours, :bronni_id
    end
end
