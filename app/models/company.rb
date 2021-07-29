class Company < ApplicationRecord
  belongs_to :sector
  has_many :stocks, dependent: :destroy
end
