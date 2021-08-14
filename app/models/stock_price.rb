class StockPrice < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :stock
end

# == Schema Information
#
# Table name: stock_prices
#
#  id         :bigint           not null, primary key
#  close      :decimal(15, 2)   not null
#  day        :date             not null
#  high       :decimal(15, 2)   not null
#  low        :decimal(15, 2)   not null
#  open       :decimal(15, 2)   not null
#  volume     :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  stock_id   :bigint           not null
#
# Indexes
#
#  index_stock_prices_on_stock_id  (stock_id)
#
# Foreign Keys
#
#  fk_rails_...  (stock_id => stocks.id)
#
