class AddWalletToUserStock < ActiveRecord::Migration[6.1]
  def change
    add_reference :user_stocks, :wallet
  end
end
