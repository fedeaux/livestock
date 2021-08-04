class Api::StocksController < ApiController
  def show
    @stock = Stock.find_by_id_or_code(params[:id])
  end

  def index
    @stocks = Stock.all.limit(20)
  end
end
