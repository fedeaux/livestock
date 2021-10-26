class AddProvidedAtToStockEarning < ActiveRecord::Migration[6.1]
  def change
    add_column :stock_earnings, :provided_at, :date
  end
end
