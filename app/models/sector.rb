class Sector < ApplicationRecord
  has_many :companies, dependent: :destroy
end
