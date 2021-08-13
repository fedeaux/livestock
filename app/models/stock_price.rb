class StockPrice < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :stock
end
