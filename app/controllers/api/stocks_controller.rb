class Api::StocksController < ApiController
  before_action :set_query, only: [:show, :index]

  def show
    @stock = Stock.c(params[:id])
    # http://localhost:3000/api/stocks/CSMG3.json?query={%22includes%22:{%22currentUserStock%22:true}}

    if @query.includes? :current_user_stock
      @user_stock = @stock.user_stocks.find_by(user_id: current_user.id)
    end

    if @query.includes? :stock_prices
      @stock_prices = @stock.stock_prices
    end

    if @query.includes? :active_trend
      @active_trend = @stock.active_trend

      if @active_trend && @query.includes(:active_trend).includes?(:stock_prices)
        @active_trend_prices = @active_trend.stock_prices
      end
    end
  end

  def index
    @stocks = Stock.all.limit(20)
  end

  def query
    Braindamage::Query.from_json params[:query]
  end

  def set_query
    @query = query
  end
end
