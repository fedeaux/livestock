class ChangeStockPricesVolumeType < ActiveRecord::Migration[6.1]
  def change
    change_column :stock_prices, :volume, :bigint
  end
end
