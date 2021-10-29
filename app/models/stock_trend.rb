class StockTrend < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :stock
end

# == Schema Information
#
# Table name: stock_trends
#
#  id          :bigint           not null, primary key
#  deviation   :decimal(15, 8)
#  finished_at :date
#  intercept   :decimal(15, 8)
#  slope       :decimal(15, 8)
#  started_at  :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  stock_id    :bigint           not null
#
# Indexes
#
#  index_stock_trends_on_stock_id  (stock_id)
#
# Foreign Keys
#
#  fk_rails_...  (stock_id => stocks.id)
#
