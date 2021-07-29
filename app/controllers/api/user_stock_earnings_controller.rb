class Api::UserStockEarningsController < ApiController
  def index
    @user_stock_earnings = UserStockEarning.all
  end
end
