class AddSecondaryKpisToStockKpis < ActiveRecord::Migration[6.1]
  def change
    add_column :stock_kpis, :opdy, :decimal, precision: 15, scale: 8, default: 0
    add_column :stock_kpis, :ddpy, :integer, default: 0
  end
end
