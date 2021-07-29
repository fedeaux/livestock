class UserStockEarning < ApplicationRecord
  include Braindamageable

  belongs_to :user_stock
  before_save :ensure_per_stock

  def ensure_per_stock
    self.per_stock = total / stock_count
  end
end
