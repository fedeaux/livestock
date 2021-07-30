class StockEarning < ApplicationRecord
  include Braindamageable
  belongs_to :stock
end
