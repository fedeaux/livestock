class Wallet < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user
  has_many :user_stocks
  before_save :ensure_math

  def reset
    self.price = 0
    self.market_price = 0
    self.earnings = 0
    self.payout = 0
  end

  def ensure_math
    return self.payout_ratio = 0 if price.zero?

    self.market_result = market_price - price
    self.market_result_ratio = market_result / price
    self.payout_ratio = payout / price
  end
end

# == Schema Information
#
# Table name: wallets
#
#  id                  :bigint           not null, primary key
#  earnings            :decimal(15, 2)   default(0.0)
#  earnings_ratio      :decimal(15, 8)   default(0.0)
#  market_price        :decimal(15, 2)   default(0.0)
#  market_price_ratio  :decimal(15, 8)   default(0.0)
#  market_result       :decimal(15, 2)   default(0.0)
#  market_result_ratio :decimal(15, 8)   default(0.0)
#  name                :string
#  payout              :decimal(15, 2)   default(0.0)
#  payout_ratio        :decimal(15, 8)   default(0.0)
#  price               :decimal(15, 2)   default(0.0)
#  price_ratio         :decimal(15, 8)   default(0.0)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :bigint           not null
#
# Indexes
#
#  index_wallets_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
