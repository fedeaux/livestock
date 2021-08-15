class AddTargetPercentageAndKeyToWallet < ActiveRecord::Migration[6.1]
  def change
    add_column :wallets, :target_percentage, :decimal, precision: 15, scale: 8, default: 0
    add_column :wallets, :key, :string
  end
end
