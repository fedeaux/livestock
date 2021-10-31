class UserStock < ApplicationRecord
  include Braindamage::Braindamageable
  include Stockable

  belongs_to :user
  belongs_to :stock
  belongs_to :wallet, optional: true
  has_many :user_stock_earnings, dependent: :destroy
  has_many :user_stock_operations, dependent: :destroy
  expose_associations

  exposed_delegate :code, to: :stock
  exposed_delegate :category, to: :stock
  exposed_delegate :status_invest_url, to: :stock

  expose :inactive?
  expose :active?
  expose :wallet_name

  before_save :ensure_math

  scope :active, -> {
    where("stock_count > 0")
  }

  # TODO: expose, prefix: true
  def wallet_name
    wallet&.name
  end

  def inactive?
    stock_count == 0
  end

  def active?
    ! inactive?
  end

  def ensure_math
    return unless stock_count && market_price_per_stock
    self.market_price = stock_count * market_price_per_stock
    self.market_result = market_price - price
    self.payout = market_result + earnings

    if price > 0
      self.market_result_ratio = market_result / price
      self.payout_ratio = payout / price
    else
      self.market_result_ratio = 0
      self.payout_ratio = 0
    end
  end
end

# == Schema Information
#
# Table name: user_stocks
#
#  id                      :bigint           not null, primary key
#  average_price_per_stock :decimal(15, 2)
#  earnings                :decimal(15, 2)
#  market_price            :decimal(15, 2)
#  market_price_per_stock  :decimal(15, 2)
#  market_result           :decimal(15, 2)   default(0.0)
#  market_result_ratio     :decimal(15, 8)   default(0.0)
#  payout                  :decimal(15, 2)   default(0.0)
#  payout_ratio            :decimal(15, 8)   default(0.0)
#  price                   :decimal(15, 2)
#  stock_count             :integer
#  wallet_ratio            :decimal(15, 8)   default(0.0)
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  stock_id                :bigint           not null
#  user_id                 :bigint           not null
#  wallet_id               :integer
#
# Indexes
#
#  index_user_stocks_on_stock_id   (stock_id)
#  index_user_stocks_on_user_id    (user_id)
#  index_user_stocks_on_wallet_id  (wallet_id)
#
# Foreign Keys
#
#  fk_rails_...  (stock_id => stocks.id)
#  fk_rails_...  (user_id => users.id)
#
