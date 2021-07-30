class Stock < ApplicationRecord
  include Braindamageable
  has_many :user_stocks, dependent: :destroy
  has_many :stock_earnings, dependent: :destroy
  has_many :stock_prices, dependent: :destroy
  belongs_to :company
  exposed_delegate :category, to: :company

  validates :code, presence: {
    message: "Please provide a code"
  }

  expose :link
  hide :created_at

  def link
    "https://www.marketwatch.com/investing/stock/#{code}"
  end

  def international_code
    "#{code}.SA"
  end

  def last_price
    stock_prices.order("day DESC").limit(1).last
  end

  def self.find_by_id_or_code(id_or_code)
    where(id: id_or_code).or(where(code: id_or_code)).limit(1).first
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
