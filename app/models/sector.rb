class Sector < ApplicationRecord
  include Braindamage::Braindamageable
  has_many :companies, dependent: :destroy

  exposed_enum category: {
    market: 0,
    real_estate: 1
  }
end

# == Schema Information
#
# Table name: sectors
#
#  id         :bigint           not null, primary key
#  category   :integer          default("market")
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
