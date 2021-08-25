class Stock < ApplicationRecord
  include Braindamage::Braindamageable
  has_many :user_stocks, dependent: :destroy
  has_many :stock_earnings, dependent: :destroy
  has_many :stock_prices, dependent: :destroy
  has_many :stock_kpis, dependent: :destroy
  before_save :sanitize_code

  exposed_enum category: {
    market: 0,
    real_estate: 1
  }

  exposed_enum currency: {
    brl: 0,
    usd: 1
  }

  validates :code, presence: {
    message: "Please provide a code"
  }

  expose :link
  hide :created_at

  def self.c(id_or_code)
    find_by_id_or_code(id_or_code)
  end

  def self.ensure(code)
    where(code: code.upcase).first_or_create
  end

  def sanitize_code
    self.code = code.upcase.strip
  end

  def link
    "https://www.marketwatch.com/investing/stock/#{code}"
  end

  def international_code
    "#{code}.SA"
  end

  def last_price
    stock_prices.order("day DESC").limit(1).last
  end

  def last_kpi
    stock_kpis.order("date DESC").limit(1).last
  end

  def self.find_by_id_or_code(id_or_code)
    where(id: id_or_code).or(where(code: id_or_code)).limit(1).first
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
#  category   :integer          default("market")
#  code       :string
#  currency   :integer          default("brl")
#  name       :string
#  sector     :string
#  segment    :string
#  subsector  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
