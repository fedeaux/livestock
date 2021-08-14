class UserStockEarning < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user_stock
  before_save :ensure_per_stock
  exposed_delegate :code, to: :user_stock

  def ensure_per_stock
    self.per_stock = total / stock_count
  end
end

# == Schema Information
#
# Table name: user_stock_earnings
#
#  id            :bigint           not null, primary key
#  per_stock     :decimal(15, 10)
#  received_at   :date
#  stock_count   :integer
#  total         :decimal(15, 2)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_stock_id :bigint           not null
#
# Indexes
#
#  index_user_stock_earnings_on_user_stock_id  (user_stock_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_stock_id => user_stocks.id)
#
