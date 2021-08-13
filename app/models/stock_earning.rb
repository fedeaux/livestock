class StockEarning < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :stock
end
