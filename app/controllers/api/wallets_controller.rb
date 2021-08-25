class Api::WalletsController < ApiController
  def index
    @wallets = current_user.wallets.includes(:user_stocks)
  end
end
