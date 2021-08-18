class Api::UserStocksController < ApiController
  def show
    @user_stock = UserStock.c(params[:id])
  end

  def index
    @user_stocks = UserStock.all
  end
end
