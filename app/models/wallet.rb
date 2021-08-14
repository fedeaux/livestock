class Wallet < ApplicationRecord
  belongs_to :user
  has_many :user_stocks

  def reset
    self.total_price = 0
    self.total_market_price = 0
    self.total_earnings = 0
    self.current_payout = 0
    self.price_ratio = 0
    self.market_price_ratio = 0
    self.current_payout_ratio = 0
  end
end
