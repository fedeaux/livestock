class Api::UserStockEarningsController < ApiController
  def index
    @user_stock_earnings = current_user.user_stock_earnings.order("received_at DESC")
  end
end
