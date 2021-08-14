class UserStock < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user
  belongs_to :stock
  belongs_to :wallet

  has_many :user_stock_earnings
  has_many :user_stock_operations

  exposed_delegate :code, to: :stock
  exposed_delegate :category, to: :stock

  expose :inactive?
  expose :active?
  expose :current_market_result
  expose :current_payout
  expose :current_payout_rate

  before_save :ensure_math

  scope :active, -> {
    where("stock_count > 0")
  }

  def inactive?
    stock_count == 0
  end

  def active?
    ! inactive?
  end

  def ensure_math
    return unless stock_count && market_price_per_stock

    self.total_market_price = stock_count * market_price_per_stock
  end

  def current_market_result
    return 0 if inactive?

    total_market_price - total_price
  end

  def current_payout
    return 0 if inactive?

    current_market_result + total_earnings
  end

  def current_payout_rate
    return 0 if total_price == 0

    current_payout / total_price
  end
end
