class Api::StockPricesController < ApiController
  def index
    @stock_prices = StockPrice.includes(:stock).all
  end
end
