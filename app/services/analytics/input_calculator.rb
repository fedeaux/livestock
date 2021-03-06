class Analytics::InputCalculator
  include ActionView::Helpers::NumberHelper
  attr_accessor :user
  attr_accessor :input_amount

  def initialize(user:, input_amount:)
    ActiveRecord::Base.logger = nil
    self.user = user
    self.input_amount = input_amount
  end

  def format_money(value)
  end

  def format_percentage(value)
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

  def calculate_without_selling
    current_total_market_price = user.wallets.map(&:market_price).sum
    new_total_market_price = current_total_market_price + input_amount
    user_wallets = user.wallets.to_a
    inputable_user_wallets = []
    inputs_per_wallet = []

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

    # Sort by overvaluation
    user_wallets.sort_by! do |wallet|
      wallet.target_percentage - wallet.market_price_ratio
    end

    most_overvalued_wallet = user_wallets.shift

    minimum_balanced_total_market_price = most_overvalued_wallet.market_price / most_overvalued_wallet.target_percentage
    total_input_to_balance = minimum_balanced_total_market_price - current_total_market_price
    input_amount_to_amount_to_balance_ratio = input_amount / total_input_to_balance

    inputs_per_wallet.each do |wallet_input|
      wallet_input.balanced_wallet_value = minimum_balanced_total_market_price * wallet_input.wallet.target_percentage
      wallet_input.balanced_percentage = wallet_input.balanced_wallet_value / minimum_balanced_total_market_price
    end

    # puts "minimum_balanced_total_market_price: #{minimum_balanced_total_market_price}"
    # puts "total_input_to_balance: #{total_input_to_balance}"
    # puts "input_amount: #{input_amount}"
    # puts "ratio: #{input_amount_to_amount_to_balance_ratio}"

    if (total_input_to_balance > input_amount)
      # puts "Can't balance without selling"

      inputable_user_wallets.each do |wallet|
        balanced_wallet_value = wallet.target_percentage * minimum_balanced_total_market_price
        input_to_balance_wallet = balanced_wallet_value - wallet.market_price

        amount_to_input_to_wallet = input_to_balance_wallet * input_amount_to_amount_to_balance_ratio

        inputs_per_wallet.push OpenStruct.new(
          target_percentage: wallet.target_percentage,
          amount_to_input: amount_to_input_to_wallet,
          new_market_price: amount_to_input_to_wallet + wallet.market_price,
          percentage: (amount_to_input_to_wallet + wallet.market_price) * 100/new_total_market_price,
          balanced_wallet_value: balanced_wallet_value,
          balanced_percentage: balanced_wallet_value / minimum_balanced_total_market_price,
          wallet: wallet
        )
      end
    else
      inputable_user_wallets.each do |wallet|
        amount_to_input_to_wallet = new_total_market_price * wallet.target_percentage - wallet.market_price

        inputs_per_wallet.push OpenStruct.new(
          target_percentage: wallet.target_percentage,
          amount_to_input: amount_to_input_to_wallet,
          new_market_price: amount_to_input_to_wallet + wallet.market_price,
          percentage: (amount_to_input_to_wallet + wallet.market_price) * 100/new_total_market_price,
          balanced_wallet_value: amount_to_input_to_wallet + wallet.market_price,
          balanced_percentage: (amount_to_input_to_wallet + wallet.market_price) * 100/new_total_market_price,
          wallet: wallet
        )
      end
    end

    # BRAP3 CMIG4 TRPL4 TAEE4 CSMG3 UNIP6 CPLE3 PCAR3 AURA33 EGIE3 SMLS3 VIVT3 CESP6 ROMI3 B3SA3 WSON33 GRND3

    stocks_to_buy = {
      'Dividends' => %w[UNIP6 BBAS3],
      'Growth' => %w[],
      'Real Estate' => %[]
    }

    stocks_to_buy.each do |wallet_name, stocks|
      next if stocks.empty?

      wallet_input = inputs_per_wallet.select do |wallet_input|
        wallet_input.wallet.name == wallet_name
      end.first

      wallet_input.inputs_per_stock = []
      user_stocks = stocks.map do |stock_code_to_buy|
        wallet_input.wallet.user_stocks.select do |us|
          us.code == stock_code_to_buy
        end.first
      end.compact

      total_current_to_buy_market_price = user_stocks.map(&:market_price).sum
      target_market_price_per_stock = (total_current_to_buy_market_price + wallet_input.amount_to_input) / stocks.count

      stocks.each do |stock_code_to_buy|
        user_stock = wallet_input.wallet.user_stocks.select do |us|
          us.code == stock_code_to_buy
        end.first

        amount_to_input = target_market_price_per_stock - (user_stock ? user_stock.market_price : 0)

        wallet_input.inputs_per_stock.push(
          OpenStruct.new(
            code: stock_code_to_buy,
            amount_to_input: amount_to_input,
            new_market_price: target_market_price_per_stock,
            percentage: target_market_price_per_stock * 100 / wallet_input.new_market_price
          )
        )
      end

      # puts "#{wallet_name}: #{wallet_stocks_count}"
    end

    puts "\nTotal Input: #{number_to_currency(input_amount)}"
    puts "Inputs:\n\n"

    inputs_per_wallet.each do |wallet_input|
      unit = "R$ "
      exchange_rate = 1

      if(wallet_input.wallet.name == "International")
        unit = "USD "
        exchange_rate = 5.2
      end

      puts "#{wallet_input.wallet.name}, input #{number_to_currency(wallet_input.amount_to_input/exchange_rate, unit: unit)}: #{number_to_currency(wallet_input.new_market_price/exchange_rate, unit: unit)} (#{number_to_percentage(wallet_input.percentage)})"

      if wallet_input.inputs_per_stock
        wallet_input.inputs_per_stock.each do |stock_input|
          puts "  #{stock_input.code}: #{number_to_currency(stock_input.amount_to_input/exchange_rate, unit: unit)} (#{number_to_currency(stock_input.new_market_price/exchange_rate, unit: unit)}, #{number_to_percentage(stock_input.percentage)})"
        end
      end
      puts '--------------'
    end

    nil
  end
end
