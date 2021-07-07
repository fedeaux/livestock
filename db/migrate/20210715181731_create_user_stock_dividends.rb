class CreateUserStockDividends < ActiveRecord::Migration[6.1]
  def change
    create_table :user_stock_dividends do |t|
      t.belongs_to :user_stock, null: false, foreign_key: true
      t.decimal :total, precision: 15, scale: 2
      t.decimal :per_stock, precision: 15, scale: 2
      t.integer :stock_count
      t.date :received_at

      t.timestamps
    end
  end
end
