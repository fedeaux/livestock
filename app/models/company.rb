class Company < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :sector
  has_many :stocks, dependent: :destroy
  exposed_delegate :category, to: :sector
end
