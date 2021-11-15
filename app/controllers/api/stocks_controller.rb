class Api::StocksController < ApiController
  def show
    @stock = Stock.c(params[:id])

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
end
