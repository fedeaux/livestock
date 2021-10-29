class StockTrends::Calculate
  def initialize(stock_trend_id)
    @stock_trend = StockTrend.find stock_trend_id
  end

  def call
    stock_prices = @stock_trend.stock.stock_prices.order(:day).where('day >= ?', @stock_trend.started_at)

    unless stock_prices.any?
      puts "No prices for #{@stock_trend.stock.code}"
      return
    end

    day_average_price_pairs = stock_prices.map do |stock_price|
      [stock_price.day.to_time.to_i / 60 / 60 / 24, (stock_price.high + stock_price.low)/2]
    end

    linear_regression = RubyLinearRegression.new
    linear_regression.load_training_data(
      day_average_price_pairs.map(&:first).map { |v| [v] },
      day_average_price_pairs.map(&:second),
      false
    )
    linear_regression.train_normal_equation

    x1 = day_average_price_pairs.first.first
    x2 = day_average_price_pairs.last.first

    y1 = linear_regression.predict [x1]
    y2 = linear_regression.predict [x2]

    a = (y1 - y2)/(x1 - x2)
    b = y1 - a * x1

    deviation = day_average_price_pairs.map do |pair|
      (linear_regression.predict([pair.first]) - pair.second).abs
    end.max

    @stock_trend.update(
      slope: a,
      intercept: b,
      deviation: deviation
    )
  end
end
