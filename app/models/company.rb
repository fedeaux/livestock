class Company < ApplicationRecord
  include Braindamageable
  belongs_to :sector
  has_many :stocks, dependent: :destroy
end
