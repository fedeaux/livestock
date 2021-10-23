class StockEarning < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :stock
  expose_associations

  validates :per_stock, :category, :received_at, presence: true

  exposed_enum category: {
                 dividends: 0,
                 interest_on_equity: 1,
                 amortization: 2,
                 taxed_income: 3,
                 earning: 4
               }

  scope :month, ->(month) {
    where(received_at: (month..(month + 1.month)))
  }
end

# == Schema Information
#
# Table name: stock_earnings
#
#  id          :bigint           not null, primary key
#  category    :integer          default("dividends")
#  dy          :decimal(15, 2)
#  per_stock   :decimal(15, 10)
#  received_at :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  stock_id    :bigint           not null
#
# Indexes
#
#  index_stock_earnings_on_stock_id  (stock_id)
#
# Foreign Keys
#
#  fk_rails_...  (stock_id => stocks.id)
#
