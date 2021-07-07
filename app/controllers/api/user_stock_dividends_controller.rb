class Api::UserStockDividendsController < ApiController
  def index
    @user_stock_dividends = UserStockDividend.all
  end
end
