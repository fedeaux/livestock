class CreateStockPrices < ActiveRecord::Migration[6.1]
  def change
    create_table :stock_prices do |t|
      t.decimal :open, precision: 15, scale: 2, null: false
      t.decimal :high, precision: 15, scale: 2, null: false
      t.decimal :low, precision: 15, scale: 2, null: false
      t.decimal :close, precision: 15, scale: 2, null: false
      t.integer :volume, default: 0, null: false
      t.date :day, null: false
      t.belongs_to :stock, null: false, foreign_key: true

      t.timestamps
    end
  end
end
