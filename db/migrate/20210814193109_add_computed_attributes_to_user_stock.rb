class AddComputedAttributesToUserStock < ActiveRecord::Migration[6.1]
  def change
    add_column :user_stocks, :market_result, :decimal, precision: 15, scale: 2, default: 0
    add_column :user_stocks, :market_result_ratio, :decimal, precision: 15, scale: 8, default: 0
    add_column :user_stocks, :payout, :decimal, precision: 15, scale: 2, default: 0
    add_column :user_stocks, :payout_ratio, :decimal, precision: 15, scale: 8, default: 0
    rename_column :user_stocks, :total_earnings, :earnings
    rename_column :user_stocks, :total_market_price, :market_price
    rename_column :user_stocks, :total_price, :price
  end
end
