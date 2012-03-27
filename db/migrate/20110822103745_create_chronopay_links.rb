class CreateChronopayLinks < ActiveRecord::Migration
  def self.up
    create_table :chronopay_links do |t|
      t.string :name, :null => false
      t.string :pay_product_id, :null => false
      t.float :product_price, :null => false
      t.string :sign, :null => false
      t.integer :status, :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :chronopay_links
  end
end
