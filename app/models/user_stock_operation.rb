class UserStockOperation < ApplicationRecord
  include Braindamageable

  belongs_to :user_stock

  exposed_enum nature: {
    buy: 0,
    sell: 10
  }
end
