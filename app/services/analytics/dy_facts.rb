class Analytics::DyFacts
  attr_accessor :stock

  def initialize(stock:)
    self.stock = stock
  end

  def calculate
    mean_earnings_per_year
  end

  def mean_earnings_per_year
    earnings_by_year = {
    }

    stock.stock_earnings.each do |stock_earning|
      year = stock_earning.received_at.to_s.split('-').first.strip
      earnings_by_year[year] ||= []
      earnings_by_year[year].push stock_earning
    end

    earnings_by_year.each do |year, earnings|
      average = earnings.map(&:per_stock).sum / earnings.count
      puts "#{year}: #{average}"
    end
  end
end
