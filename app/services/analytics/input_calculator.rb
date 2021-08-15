class Analytics::InputCalculator
  attr_accessor :user
  attr_accessor :input_amount

  def initialize(user:, input_amount:)
    self.user = user
    self.input_amount = input_amount
  end

  def calculate
    total_market_price = user.wallets.map(&:market_price).sum
    new_total_market_price = total_market_price + input_amount
    inputs_per_wallet = []

    user.wallets.each do |wallet|
      new_market_price = new_total_market_price * wallet.target_percentage
      inputs_per_wallet.push({
                               new_market_price: new_market_price,
                               amount_to_input: new_market_price - wallet.market_price,
                               wallet: wallet,
                               percentage: new_market_price * 100 / new_total_market_price
                             })
    end

    puts "total_market_price #{total_market_price}"
    puts "new_total_market_price #{new_total_market_price}"

    inputs_per_wallet.each do |wallet_input|
      puts "Input #{wallet_input[:amount_to_input]} at #{wallet_input[:wallet].name}"
      puts "  For a total of #{wallet_input[:new_market_price]} (#{wallet_input[:percentage]}%)"
      puts '--------------'
    end

    nil
  end
end
