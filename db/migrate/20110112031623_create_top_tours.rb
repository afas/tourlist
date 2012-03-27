class CreateTopTours < ActiveRecord::Migration
  def self.up
    create_table :top_tours do |t|
      t.string :title
      t.text :description
      t.integer :price

      t.timestamps
    end
  end

  def self.down
    drop_table :top_tours
  end
end
