class AddAdlCagrRAndCagrEToStockKpis < ActiveRecord::Migration[6.1]
  def change
    add_column :stock_kpis, :adl, :bigint, default: 0
    add_column :stock_kpis, :cagr_r, :decimal, precision: 15, scale: 4
    add_column :stock_kpis, :cagr_e, :decimal, precision: 15, scale: 4
  end
end
