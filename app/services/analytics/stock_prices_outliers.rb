class Analytics::StockPricesOutliers
  def initialize
    ActiveRecord::Base.logger = nil
  end

  def calculate
    # I don't have enough data :(
    variations = []

    Stock.first(900).each do |stock|
      next unless stock.market?
      prices = stock.stock_prices
      next if prices.count.zero?

      variation = prices.last.close - prices.first.close
      variation_ratio = (variation/prices.first.close * 100.0).to_i / 100.0
      puts "#{stock.code} #{prices.first.day.to_s} #{prices.first.close} => #{prices.last.close} (#{variation}, #{variation_ratio}%)"
      # variations.push({ from: prices.first.close, to: prices.last.close, variation: })
    end
    # ap prices.first
    # ap prices.last
    # ap StockPrice.last.stock.stock_prices
  end
end
