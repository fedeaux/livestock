class Api::StocksController < ApiController
  def show
    @stock = Stock.c(params[:id])
  end

  def index
    @stocks = Stock.all.limit(20)
  end
end
