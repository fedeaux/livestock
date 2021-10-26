class Api::StockEarningsController < ApiController
  def index
    @stock_earnings = StockEarning.includes(:stock).all
  end
end
