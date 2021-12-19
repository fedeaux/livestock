class StockPriceAlert
  attr_accessor :stock_code, :buy_price, :sell_price, :stop_price, :last_price, :last_status, :status, :current_price

  def initialize(stock_code:, buy_price:, sell_price:, stop_price:, last_price: nil, last_status: nil)
    @stock_code = stock_code
    @buy_price = buy_price.to_f
    @sell_price = sell_price.to_f
    @stop_price = stop_price.to_f

    @last_price = last_price
    @last_status = last_status
  end

  def description
    "#{@stock_code} --- #{'%.2f' % buy_price}"
  end

  def sell_message
    return nil unless sell_price > 0

    "#{@stock_code} @ #{'%.2f' % sell_price}"
  end

  def update(price_updates)
    self.current_price = price_updates['currentPrice'].to_f

    if current_price <= buy_price
      self.status = 'buy'
      return nil if last_status == 'buy'

      return "Buy #{stock_code} @ #{'%.2f' % current_price}/#{'%.2f' % buy_price}"
    end

    if current_price <= (buy_price * 1.01)
      self.status = 'close_buy'
      return nil unless last_status != 'close_buy' || current_price < last_price

      return "#{stock_code} close to buy #{'%.2f' % current_price}/#{'%.2f' % buy_price}"
    end
  end

  def attributes
    {
      stock_code: stock_code,
      buy_price: buy_price,
      sell_price: sell_price,
      stop_price: stop_price,
      last_price: current_price,
      last_status: status,
    }
  end
end
