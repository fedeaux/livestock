class StockKpi < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :stock

  before_save :ensure_math

  def ensure_math
    return unless price && bvps && eps

    self.p_to_bv = bvps != 0 ? price / bvps : 0
    self.p_to_eps = eps != 0 ? price / eps : 0
  end

  KPIS = {
    bvps: {},
    dy: { good: '+' },
    eps: { good: '+' },
    ev_to_ebit: { good: '-' },
    nd_to_ebit: { good: '-' },
    nd_to_ev: { good: '-' },
    p_to_bv: { good: '-' },
    p_to_e: { good: '-' },
    p_to_ebit: { good: '-' },
    p_to_eps: { good: '-' },
    p_to_ev: { good: '-' },
    psr: { good: '+' },
    roa: { good: '+' },
    roe: { good: '+' },
    roic: { good: '+' }
  }
end

# == Schema Information
#
# Table name: stock_kpis
#
#  id         :bigint           not null, primary key
#  bvps       :decimal(15, 8)
#  date       :date
#  dy         :decimal(15, 8)
#  eps        :decimal(15, 8)
#  ev_to_ebit :decimal(15, 8)
#  nd_to_ebit :decimal(15, 8)
#  nd_to_ev   :decimal(15, 8)
#  p_to_bv    :decimal(15, 8)
#  p_to_e     :decimal(15, 8)
#  p_to_ebit  :decimal(15, 8)
#  p_to_eps   :decimal(15, 8)
#  p_to_ev    :decimal(15, 8)
#  price      :decimal(15, 8)
#  psr        :decimal(15, 8)
#  roa        :decimal(15, 8)
#  roe        :decimal(15, 8)
#  roic       :decimal(15, 8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  stock_id   :bigint           not null
#
# Indexes
#
#  index_stock_kpis_on_stock_id  (stock_id)
#
# Foreign Keys
#
#  fk_rails_...  (stock_id => stocks.id)
#
