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

  def calculate_without_selling_bk
    current_total_market_price = user.wallets.map(&:market_price).sum
    new_total_market_price = current_total_market_price + input_amount
    inputs_per_wallet = []
    user_wallets = user.wallets.to_a
    inputable_user_wallets = []

    gaps_per_wallet = {}
    current_total_gap = 0
    total_input_amount_needed_to_balance = 0

    # First, input 0 on wallets that will be above the target even with input 0
    user_wallets.each do |wallet|
      if wallet.market_price >= wallet.target_percentage * new_total_market_price
        inputs_per_wallet.push(OpenStruct.new(
                                 new_market_price: wallet.market_price,
                                 amount_to_input: 0,
                                 wallet: wallet,
                                 percentage: wallet.market_price * 100 / new_total_market_price
                               ))
      else
        inputable_user_wallets.push wallet
      end
    end

    # Total gap and total gap per wallet
    inputable_user_wallets.each do |wallet|
      input_amount_needed_to_balance = wallet.target_percentage * new_total_market_price - wallet.market_price
      total_input_amount_needed_to_balance += input_amount_needed_to_balance
      new_percentage_without_input = wallet.market_price / new_total_market_price
      target_percentage = wallet.target_percentage
      wallet_percentage_gap = target_percentage - new_percentage_without_input
      current_total_gap += wallet_percentage_gap

      gaps_per_wallet[wallet.id] = OpenStruct.new(
        input_amount_needed_to_balance: input_amount_needed_to_balance,
        new_percentage_without_input: new_percentage_without_input,
        target_percentage: target_percentage,
        gap: wallet_percentage_gap
      )
    end

    tp gaps_per_wallet.values, :input_amount_needed_to_balance #new_percentage_without_input, :target_percentage, :gap
    puts "total_input_amount_needed_to_balance: #{total_input_amount_needed_to_balance}"

    inputable_user_wallets.each do |wallet|
      input_amount_needed_to_balance = gaps_per_wallet[wallet.id].input_amount_needed_to_balance
      amount_to_input = input_amount_needed_to_balance * input_amount / total_input_amount_needed_to_balance
      new_market_price = wallet.market_price + amount_to_input

      inputs_per_wallet.push(OpenStruct.new(
                               new_market_price: new_market_price,
                               amount_to_input: amount_to_input,
                               wallet: wallet,
                               percentage: new_market_price * 100 / new_total_market_price
                             ))
    end

    puts "Current Total Market Price: #{current_total_market_price}"
    puts "New Total Market Price: #{new_total_market_price}"

    inputs_per_wallet.each do |wallet_input|
      puts "Input #{wallet_input.amount_to_input} at #{wallet_input.wallet.name}"
      puts "  For a total of #{wallet_input.new_market_price} (#{wallet_input.percentage}%)"
      puts '--------------'
    end

    nil
  end
end
