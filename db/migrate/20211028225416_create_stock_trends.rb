class CreateStockTrends < ActiveRecord::Migration[6.1]
  def change
    create_table :stock_trends do |t|
      t.date :started_at, null: false
      t.date :finished_at
      t.belongs_to :stock, null: false, foreign_key: true
      t.decimal :slope, precision: 15, scale: 8
      t.decimal :intercept, precision: 15, scale: 8
      t.decimal :deviation, precision: 15, scale: 8

      t.timestamps
    end
  end
end
