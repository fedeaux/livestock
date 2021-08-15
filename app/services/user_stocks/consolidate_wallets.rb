class UserStocks::ConsolidateWallets
  attr_accessor :user

  def initialize(user:)
    self.user = user
  end

  def do
    duct_tapped_ensure_user_stock_wallets
    wallets = user.wallets
    price = 0
    market_price = 0
    earnings = 0

    wallets.each do |wallet|
      consolidate_wallet wallet

      price += wallet.price
      market_price += wallet.market_price
      earnings += wallet.earnings
    end

    wallets.each do |wallet|
      wallet.price_ratio = wallet.price / price
      wallet.market_price_ratio = wallet.market_price / market_price
      wallet.earnings_ratio = wallet.earnings / earnings
    end

    wallets.each(&:save)
  end

  def consolidate_wallet(wallet)
    wallet.reset

    wallet.user_stocks.active.each do |user_stock|
      wallet.price += user_stock.price
      wallet.market_price += user_stock.market_price
      wallet.earnings += user_stock.earnings
      wallet.payout += user_stock.payout
    end

    wallet.user_stocks.active.each do |user_stock|
      user_stock.wallet_ratio = user_stock.market_price / wallet.market_price
      user_stock.save
    end
  end

  def duct_tapped_ensure_user_stock_wallets
    @dividends_wallet = user.wallets.where(name: 'Dividends').first_or_create
    @dividends_wallet.update(target_percentage: 0.57, key: :dividends)

    @real_estate_wallet = user.wallets.where(name: 'Real Estate').first_or_create
    @real_estate_wallet.update(target_percentage: 0.40, key: :real_estate)

    @gambling_wallet = user.wallets.where(name: 'Gambling').first_or_create
    @gambling_wallet.update(target_percentage: 0.03, key: :gambling)

    user.user_stocks.active.each do |user_stock|
      if user_stock.category == 'real_estate'
        user_stock.update(wallet: @real_estate_wallet)
      else
        if %w[OIBR3 RAIZ4].include? user_stock.code
          user_stock.update(wallet: @gambling_wallet)
        else
          user_stock.update(wallet: @dividends_wallet)
        end
      end
    end
  end
end
