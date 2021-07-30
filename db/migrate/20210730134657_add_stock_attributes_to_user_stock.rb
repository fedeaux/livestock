class AddStockAttributesToUserStock < ActiveRecord::Migration[6.1]
  def change
    add_column :user_stocks, :stock_count, :integer
    add_column :user_stocks, :average_price_per_stock, :decimal, precision: 15, scale: 2
    add_column :user_stocks, :total_price, :decimal, precision: 15, scale: 2
    add_column :user_stocks, :market_price_per_stock, :decimal, precision: 15, scale: 2
    add_column :user_stocks, :total_market_price, :decimal, precision: 15, scale: 2
    add_column :user_stocks, :total_earnings, :decimal, precision: 15, scale: 2
  end
end
