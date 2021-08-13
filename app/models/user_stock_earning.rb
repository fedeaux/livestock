class UserStockEarning < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user_stock
  before_save :ensure_per_stock
  exposed_delegate :code, to: :user_stock

  def ensure_per_stock
    self.per_stock = total / stock_count
  end
end
