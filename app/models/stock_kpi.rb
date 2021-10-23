class StockKpi < ApplicationRecord
  include Braindamage::Braindamageable
  include Stockable
  belongs_to :stock
  expose_associations

  before_save :ensure_math
  delegate :code, to: :stock

  def ensure_math
    return unless price && bvps && eps

    self.p_to_bv = bvps != 0 ? price / bvps : 0
    self.p_to_eps = eps != 0 ? price / eps : 0
    self.opdy = eval_outlier_penalized_dy
    self.ddpy = latest_earnings.count
  end

  def eval_outlier_penalized_dy
    average_latest_earnings = latest_earnings.average(:per_stock)

    # tp latest_earnings
    return 0 unless average_latest_earnings and price > 0
    # puts "#{price} #{average_latest_earnings}"


    # find outliers
    per_stocks = latest_earnings.pluck(:per_stock).sort
    last_per_stock = per_stocks.first
    first_per_stock_outlier = 0

    per_stocks.each do |current_per_stock|
      if current_per_stock > 5 * last_per_stock
        first_per_stock_outlier = current_per_stock
        break
      else
        last_per_stock = current_per_stock
      end
    end

    first_per_stock_outlier = per_stocks.last + 1 if first_per_stock_outlier == 0

    # puts "first_per_stock_outlier: #{first_per_stock_outlier}"
    non_outliers_earnings = latest_earnings.where("per_stock < ?", first_per_stock_outlier)
    # puts '----- latest_earnings ------'
    # tp latest_earnings
    # puts "average: #{average_latest_earnings}"
    # puts "dy: #{dy}"
    # puts '----- non_outliers_earnings ------'
    # tp non_outliers_earnings
    opae = non_outliers_earnings.average(:per_stock)
    # puts "opae: #{opae}"
    # puts "opdy: #{dy * opae / average_latest_earnings}"
    dy * opae / average_latest_earnings
  end

  def latest_earnings
    @latest_earnings ||= stock
                           .stock_earnings
                           .where("received_at > ?", 2.years.ago)
                           .where("received_at <= ?", date + 1.month)
  end

  attr_accessor :ev_to_ebit_deviation, :opdy_deviation

  def crazy_metric
    # opdy_deviation negativo é ruim, quanto maior, melhor!
    # ev_to_ebit_deviation negativo é bom, quanto menor, melhor!

    ((opdy_deviation ** 5 - ev_to_ebit_deviation ** 3) * 100).to_i / 100.0
  end

  def deviation(field, sd, average)
    (((send(field) - average)/sd) * 100).to_i / 100.0
  end
end

# == Schema Information
#
# Table name: stock_kpis
#
#  id         :bigint           not null, primary key
#  adl        :bigint           default(0)
#  bvps       :decimal(15, 8)
#  cagr_e     :decimal(15, 4)
#  cagr_r     :decimal(15, 4)
#  date       :date
#  ddpy       :integer          default(0)
#  dy         :decimal(15, 8)
#  eps        :decimal(15, 8)
#  ev_to_ebit :decimal(15, 8)
#  nd_to_ebit :decimal(15, 8)
#  nd_to_ev   :decimal(15, 8)
#  opdy       :decimal(15, 8)   default(0.0)
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
