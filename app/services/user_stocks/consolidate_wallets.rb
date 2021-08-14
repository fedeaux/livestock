class UserStocks::ConsolidateWallets
  attr_accessor :user

  def initialize(user:)
    self.user = user
  end

  def do
    duct_tapped_ensure_user_stock_wallets
    wallets = user.wallets

    wallets.each do |wallet|
      consolidate_wallet wallet
    end

    wallets.each(&:save)
  end

  def consolidate_wallet(wallet)
    wallet.reset

    wallet.user_stocks.active.each do |user_stock|
      wallet.total_price += user_stock.total_price
      wallet.total_market_price += user_stock.total_market_price
      wallet.total_earnings += user_stock.total_earnings
      wallet.current_payout += user_stock.current_payout
    end

    wallet.user_stocks.active.each do |user_stock|
      user_stock.wallet_ratio = user_stock.total_market_price / wallet.total_market_price
      user_stock.save
    end
  end

  def duct_tapped_ensure_user_stock_wallets
    @dividends_wallet = user.wallets.where(name: 'Dividends').first_or_create
    @real_estate_wallet = user.wallets.where(name: 'Real Estate').first_or_create
    @gambling_wallet = user.wallets.where(name: 'Gambling').first_or_create

    user.user_stocks.active.where(wallet: nil).each do |user_stock|
      if user_stock.category == 'real_estate'
        user_stock.update(wallet: @real_estate_wallet)
      else
        if %w[OIBR3 RAIZ4].include? user_stock.code
          user_stock.update(wallet: @gambling_wallet)
        else
          user_stock.update(wallet: @real_estate_wallet)
        end
      end
    end
  end
end
