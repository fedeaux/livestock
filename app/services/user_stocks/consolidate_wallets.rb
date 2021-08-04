class Wallet < OpenStruct
  def current_payout_rate
    current_payout / total_price
  end
end

class UserStocks::ConsolidateWallets
  attr_accessor :user

  def initialize(user:)
    self.user = user
  end

  def do
    wallet = Wallet.new(
      total_price: 0.0,
      total_market_price: 0.0,
      total_earnings: 0.0,
      current_payout: 0.0
    )

    user.user_stocks.active.each do |user_stock|
      wallet.total_price += user_stock.total_price
      wallet.total_market_price += user_stock.total_market_price
      wallet.total_earnings += user_stock.total_earnings
      wallet.current_payout += user_stock.current_payout
    end

    user.user_stocks.active.each do |user_stock|
      user_stock.wallet_ratio = user_stock.total_market_price / wallet.total_market_price
      user_stock.save
    end

    ap wallet
  end
end
