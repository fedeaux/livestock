class Analytics::SellResults
  attr_accessor :user_stocks

  def initialize(codes)
    self.user_stocks = codes.map do |code|
      UserStock.c(code)
    end
  end

  def calculate
    final_result = 0
    cash = 0

    puts "Resultados"
    puts "code;result;comprei;atual"
    user_stocks.each do |user_stock|
      final_result += user_stock.market_result
      cash += user_stock.market_price
      puts "#{user_stock.code};#{user_stock.market_result};#{user_stock.average_price_per_stock};#{user_stock.market_price_per_stock}"
    end

    puts ""
    puts "Totals"
    puts "Result;#{final_result}"
    puts "Cash;#{cash}"

    # user_stocks.each do |user_stock|
    #   final_result += user_stock.market_result
    #   cash += user_stock.market_price
    #   puts "#{user_stock.code}=#{user_stock.average_price_per_stock}"
    # end
  end
end
