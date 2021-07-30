class UserStockOperation < ApplicationRecord
  include Braindamageable

  belongs_to :user_stock

  exposed_enum nature: {
    buy: 0,
    sell: 10
  }

  before_save :ensure_total

  def ensure_total
    self.total = stock_price * stock_count
  end
end
