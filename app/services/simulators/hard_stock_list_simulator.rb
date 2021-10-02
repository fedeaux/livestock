DY_TAX = 0.15

class HardStockPicker
  attr_accessor :stock_codes

  def initialize(stock_codes)
    self.stock_codes = stock_codes
  end
end

class Simulators::Wallet
  include ActionView::Helpers::NumberHelper

  def initialize
    @stocks = {}
  end

  def buy(stock_code, input, month)
    price = month_stock_price(stock_code, month)
    buy_count = (input / price).to_i
    spent = buy_count * price
    stored = input - spent

    # puts "bought #{buy_count} at #{price} (#{spent})"

    unless @stocks[stock_code]
      @stocks[stock_code] = OpenStruct.new(count: 0, average_price: 0)
    end

    new_count = @stocks[stock_code].count + buy_count
    new_average_price = (@stocks[stock_code].count * @stocks[stock_code].average_price + buy_count * price) / new_count

    @stocks[stock_code].count = new_count
    @stocks[stock_code].average_price = new_average_price

    stored
  end

  def stock_codes
    @stocks.keys
  end

  def month_dividends(month)
    stock_codes.map do |stock_code|
      month_dividends_for_stock(stock_code, month)
    end.sum * (1 - DY_TAX)
  end

  def month_dividends_for_stock(stock_code, month)
    value = Stock.c(stock_code).stock_earnings.month(month).map(&:per_stock).sum
    value * (@stocks[stock_code]&.count || 0)
  end

  def month_stock_price(stock_code, month)
    price = Stock.c(stock_code).price_at_month(month)
    return price if price

    puts "NO PRICE FOR #{stock_code} at #{month.to_s}"
    100
  end

  def position
    @stocks.map do |stock_code, info|
      "  #{stock_code}: #{info.count} #{number_to_currency(info.average_price, unit: 'R$')}"
    end.join("\n")
  end

  def position_by_market_value(month)
    @stocks.map do |stock_code, info|
      price = Stock.c(stock_code).price_at_month(month)
      # puts "info.count #{info.count}"
      market_value = info.count * price

      [stock_code, market_value]
    end.sort_by do |pair|
      pair[1]
    end
  end

  def consolidation(month)
    @stocks.map do |stock_code, info|
      price = Stock.c(stock_code).price_at_month(month)
      market_value = info.count * price

      "  #{stock_code}: #{number_to_currency(market_value, unit: 'R$')} #{number_to_currency(info.average_price, unit: 'R$')} #{info.count} #{number_to_currency(price, unit: 'R$')}"
    end.join("\n")
  end

  def total_value(month)
    @stocks.map do |stock_code, info|
      price = Stock.c(stock_code).price_at_month(month)
      info.count * price
    end.sum
  end
end

class Simulators::HardStockListSimulator < Simulators::MonthlyBuySimulator
  attr_accessor :stock_codes, :wallet

  def initialize(stock_codes:, start_month:, finish_month:)
    super(stock_picker: HardStockPicker.new(stock_codes), start_month: start_month, finish_month: finish_month)
    self.stock_codes = stock_codes
    self.wallet = Simulators::Wallet.new
  end

  # Simulate one buy
  def simulate
    monthly_input = 55000.0
    post_input_dy_ratio = 0.5

    @total_input = 0
    @dividends_by_year = {}
    reserve = 0
    # collect all dividends this month
    # add to monthly input and divide this amount among all stocks

    months do |current_month|
      year = current_month.to_s.split('-').first
      received_from_dividends = wallet.month_dividends(current_month)
      @dividends_by_year[year] ||= 0
      @dividends_by_year[year] += received_from_dividends
      @total_input += monthly_input

      lowest = wallet.position_by_market_value(current_month).first(4).map(&:first)

      if lowest.empty?
        lowest = stock_codes
      # else
      #   ap lowest
      end

      total_input = monthly_input + received_from_dividends + reserve

      input_per_stock = total_input / lowest.count

      reserve = lowest.map do |stock_code|
        wallet.buy(stock_code, input_per_stock, current_month)
      end.sum

      # puts "input: #{(total_input * 100).to_i.to_f / 100}"
      # puts "reserve: #{(reserve * 100).to_i.to_f / 100}"

      # puts "  received_from_dividends: #{received_from_dividends}"
      # puts "At #{current_month.to_s}"
      # puts wallet.position
    end

    final_value = wallet.total_value(finish_month)
    valorization = final_value - @total_input
    last_dy = @dividends_by_year.values.last(2).first
    puts "\n ---From #{start_month} to #{finish_month} with #{monthly_input}/month --- \n"
    puts "  INPUT RESULT:"
    puts "  Total invested: #{number_to_currency(@total_input, unit: 'R$')}"
    puts "  Total: #{number_to_currency(final_value, unit: 'R$')}"
    puts "  Valorization: #{number_to_percentage((valorization*100/@total_input).to_i)}"
    puts "  Last year DY: #{number_to_currency(last_dy, unit: 'R$')}"
    puts "  DY: #{number_to_percentage(last_dy*100/final_value)}"
    puts "  DY on cost: #{number_to_percentage(last_dy*100/@total_input)}"
    puts "  Salary: #{number_to_currency((1 - post_input_dy_ratio) * last_dy/12, unit: 'R$')}"

    from_them_to_now do |current_month|
      year = current_month.to_s.split('-').first
      received_from_dividends = wallet.month_dividends(current_month)
      @dividends_by_year[year] ||= 0
      @dividends_by_year[year] += received_from_dividends

      lowest = wallet.position_by_market_value(current_month).first(4).map(&:first)

      if lowest.empty?
        lowest = stock_codes
      # else
      #   ap lowest
      end

      total_input = received_from_dividends * post_input_dy_ratio + reserve

      input_per_stock = total_input / lowest.count

      lowest.map do |stock_code|
        wallet.buy(stock_code, input_per_stock, current_month)
      end.sum
    end

    final_value = wallet.total_value(finish_month)
    valorization = final_value - @total_input
    first_dy = @dividends_by_year.values.first
    last_dy = @dividends_by_year.values.last(2).first
    puts "  ---From #{finish_month} to today inputing #{number_to_percentage(post_input_dy_ratio*100)} of dividends --- \n"
    puts "  TOTAL:"
    puts "  Total: #{number_to_currency(final_value, unit: 'R$')}"
    puts "  Valorization: #{number_to_percentage((valorization*100/@total_input).to_i)}"
    puts "  Last year DY: #{number_to_currency(last_dy, unit: 'R$')}"
    puts "  DY: #{number_to_percentage(last_dy*100/final_value)}"
    puts "  DY on cost: #{number_to_percentage(last_dy*100/@total_input)}"
    puts "  Salary: #{number_to_currency((1 - post_input_dy_ratio) * last_dy/12, unit: 'R$')}"
    puts "  First DY: #{number_to_currency(first_dy, unit: 'R$')}"

    # puts wallet.consolidation(finish_month)
  end
end
