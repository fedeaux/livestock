class Api::WalletsController < ApiController
  def index
    @wallets = current_user.wallets
  end
end
