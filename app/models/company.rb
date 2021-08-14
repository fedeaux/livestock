class Company < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :sector
  has_many :stocks, dependent: :destroy
  exposed_delegate :category, to: :sector
end

# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  sector_id  :bigint           not null
#
# Indexes
#
#  index_companies_on_sector_id  (sector_id)
#
# Foreign Keys
#
#  fk_rails_...  (sector_id => sectors.id)
#
