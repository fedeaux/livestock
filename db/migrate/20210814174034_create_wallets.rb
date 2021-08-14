class CreateWallets < ActiveRecord::Migration[6.1]
  def change
    create_table :wallets do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true
      t.decimal :price, precision: 15, scale: 2, default: 0
      t.decimal :price_ratio, precision: 15, scale: 8, default: 0
      t.decimal :market_price, precision: 15, scale: 2, default: 0
      t.decimal :market_price_ratio, precision: 15, scale: 8, default: 0
      t.decimal :market_result, precision: 15, scale: 2, default: 0
      t.decimal :market_result_ratio, precision: 15, scale: 8, default: 0
      t.decimal :earnings, precision: 15, scale: 2, default: 0
      t.decimal :earnings_ratio, precision: 15, scale: 8, default: 0
      t.decimal :payout, precision: 15, scale: 2, default: 0
      t.decimal :payout_ratio, precision: 15, scale: 8, default: 0

      t.timestamps
    end
  end
end
