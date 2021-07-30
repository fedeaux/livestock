class UserStock < ApplicationRecord
  include Braindamageable

  belongs_to :user
  belongs_to :stock

  has_many :user_stock_earnings
  has_many :user_stock_operations

  exposed_delegate :code, to: :stock
  exposed_delegate :category, to: :stock

  expose :inactive?
  expose :active?

  before_save :ensure_math

  def inactive?
    stock_count == 0
  end

  def active?
    ! inactive?
  end

  def ensure_math
    self.total_market_price = stock_count * market_price_per_stock
  end
end
