class AddDividendAmountToStockPrice < ActiveRecord::Migration[6.1]
  def change
    add_column :stock_prices, :dividend_amount, :decimal, precision: 15, scale: 2
  end
end
