class Wallet < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user
  has_many :user_stocks
  before_save :ensure_math

  def reset
    self.total_price = 0
    self.total_market_price = 0
    self.total_earnings = 0
    self.current_payout = 0
    self.price_ratio = 0
    self.market_price_ratio = 0
    self.current_payout_rate = 0
  end

  def ensure_math
    return self.current_payout_rate = 0 if total_price.zero?

    self.current_payout_rate = current_payout / total_price
  end
end
