class Api::UserStocksController < ApiController
  before_action :set_user_stock, only: [:show, :update]

  def update
    @user_stock.update user_stock_params
  end

  def index
    @user_stocks = UserStock.all
  end

  private

  def set_user_stock
    @user_stock = UserStock.c(params[:id])
  end

  def user_stock_params
    params.require(:user_stock).permit(:wallet_id)
  end
end
