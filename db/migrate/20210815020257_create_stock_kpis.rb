class CreateStockKpis < ActiveRecord::Migration[6.1]
  def change
    create_table :stock_kpis do |t|
      t.decimal :price, precision: 15, scale: 8
      t.decimal :dy, precision: 15, scale: 8
      t.decimal :p_to_e, precision: 15, scale: 8
      t.decimal :p_to_ev, precision: 15, scale: 8
      t.decimal :p_to_ebit, precision: 15, scale: 8
      t.decimal :ev_to_ebit, precision: 15, scale: 8
      t.decimal :nd_to_ebit, precision: 15, scale: 8
      t.decimal :nd_to_ev, precision: 15, scale: 8
      t.decimal :psr, precision: 15, scale: 8
      t.decimal :roe, precision: 15, scale: 8
      t.decimal :roa, precision: 15, scale: 8
      t.decimal :roic, precision: 15, scale: 8
      t.decimal :bvps, precision: 15, scale: 8
      t.decimal :eps, precision: 15, scale: 8
      t.decimal :p_to_bv, precision: 15, scale: 8
      t.decimal :p_to_eps, precision: 15, scale: 8
      t.date :date
      t.belongs_to :stock, null: false, foreign_key: true

      t.timestamps
    end
  end
end
