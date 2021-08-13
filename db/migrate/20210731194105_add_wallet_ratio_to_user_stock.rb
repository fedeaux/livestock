class AddWalletRatioToUserStock < ActiveRecord::Migration[6.1]
  def change
    add_column :user_stocks, :wallet_ratio, :decimal, precision: 15, scale: 8, default: 0
  end
end
