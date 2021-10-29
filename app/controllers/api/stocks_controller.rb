class Api::StocksController < ApiController
  before_action :set_query, only: [:show, :index]

  def show
    @stock = Stock.c(params[:id])

    if @query["activeTrendPrices"] && @stock.active_trend # fuck
      @stock_prices = @stock.stock_prices.where('day >= ?', @stock.active_trend.started_at)
    end

    if @query["includes"] && @query["includes"]['stockPrice']
      @stock_prices = @stock.stock_prices.order(:day)
    end
  end

  def index
    @stocks = Stock.all.limit(20)
  end

  def query
    default = { "includes": {} }

    return default unless params[:query]

    JSON.parse params[:query]
  end

  def set_query
    @query = query
  end
end
