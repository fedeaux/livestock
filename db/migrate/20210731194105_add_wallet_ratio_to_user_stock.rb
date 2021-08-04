class AddWalletRatioToUserStock < ActiveRecord::Migration[6.1]
  def change
    add_column :user_stocks, :wallet_ratio, :decimal, precision: 15, scale: 2, default: 0
  end
end
