class CreateStockEarnings < ActiveRecord::Migration[6.1]
  def change
    create_table :stock_earnings do |t|
      t.decimal :per_stock, precision: 15, scale: 10
      t.decimal :dy, precision: 15, scale: 2
      t.date :received_at
      t.integer :category, default: 0
      t.belongs_to :stock, null: false, foreign_key: true

      t.timestamps
    end
  end
end
