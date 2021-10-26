class Stocks::TrendLine
  def initialize(stock_code)
    @stock = Stock.c(stock_code)
  end

  def call
    day_average_price_pairs = @stock.stock_prices.order(:day).map do |stock_price|
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

    ap "a #{a}"
    ap "b #{b}"
    ap "cost: #{linear_regression.compute_cost}"

    byebug
  end
end
