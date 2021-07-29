class Stock < ApplicationRecord
  include Braindamageable
  has_many :user_stocks, dependent: :destroy
  has_many :stock_earnings, dependent: :destroy
  belongs_to :company

  validates :code, presence: {
    message: "Please provide a code"
  }

  expose :link
  hide :created_at

  def link
    "https://www.marketwatch.com/investing/stock/#{code}"
  end

  def self.real_state
    includes(company: :sector).where(sector: { category: 1 })
  end
end

# ╰─$ ls Work/open-source/rails-6.1.3/activerecord/lib/active_record/validations/
# absence.rb
# associated.rb <= async
# length.rb
# numericality.rb
# presence.rb
# uniqueness.rb <= async
