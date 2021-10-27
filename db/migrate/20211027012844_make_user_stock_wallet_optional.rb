class MakeUserStockWalletOptional < ActiveRecord::Migration[6.1]
  def change
    change_column :user_stocks, :wallet_id, :integer, null: true
  end
end
