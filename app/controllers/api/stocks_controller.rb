class Api::StocksController < ApiController
  def index
    @stocks = Stock.all
  end
end
