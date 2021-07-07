class CreateUserStockOperations < ActiveRecord::Migration[6.1]
  def change
    create_table :user_stock_operations do |t|
      t.integer :nature
      t.belongs_to :user_stock, null: false, foreign_key: true
      t.integer :stock_count
      t.decimal :stock_price, precision: 15, scale: 2
      t.decimal :total, precision: 15, scale: 2
      t.date :executed_at

      t.timestamps
    end
  end
end
