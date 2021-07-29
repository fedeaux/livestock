class Sector < ApplicationRecord
  include Braindamageable
  has_many :companies, dependent: :destroy

  exposed_enum category: {
    market: 0,
    real_state: 1
  }
end
