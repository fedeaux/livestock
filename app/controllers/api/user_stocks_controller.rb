class Api::UserStocksController < ApiController
  def index
    @user_stocks = UserStock.all
  end
end
