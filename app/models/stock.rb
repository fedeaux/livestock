class Stock < ApplicationRecord
  include Braindamage::Braindamageable
  has_many :user_stocks, dependent: :destroy
  has_many :stock_earnings, dependent: :destroy
  has_many :stock_prices, dependent: :destroy
  belongs_to :company
  exposed_delegate :category, to: :company
  exposed_delegate :market?, to: :company

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

  def status_invest_url
    path = market? ? 'acoes' : 'fundos-imobiliarios'

    "https://statusinvest.com.br/#{path}/#{code}"
  end
end

# ╰─$ ls Work/open-source/rails-6.1.3/activerecord/lib/active_record/validations/
# absence.rb
# associated.rb <= async
# length.rb
# numericality.rb
# presence.rb
# uniqueness.rb <= async

# == Schema Information
#
# Table name: stocks
#
#  id         :bigint           not null, primary key
#  code       :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint           not null
#
# Indexes
#
#  index_stocks_on_company_id  (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
