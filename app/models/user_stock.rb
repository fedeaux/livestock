class UserStock < ApplicationRecord
  include Braindamageable

  belongs_to :user
  belongs_to :stock

  has_many :user_stock_dividends
  has_many :user_stock_operations

  exposed_delegate :code, to: :stock
end
