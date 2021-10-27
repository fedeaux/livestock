class Api::UserStockOperationsController < ApiController
  def index
    @user_stock_operations = current_user.user_stock_operations.order("executed_at DESC")
  end
end
