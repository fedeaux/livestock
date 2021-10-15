class Seeders::StockPrices < Seeders::BaseSeeder
  def initialize
    @i = 0
  end

  def seed
    seed_prices
  end

  def seed_prices
    stocks_with_user_stocks.each do |stock|
      stock_prices_attributes = stock_price_data(stock.international_code)

      stock_prices_attributes.each do |stock_price_attributes|
        stock_price = stock.stock_prices.where(stock_price_attributes).first_or_initialize
        stock_price.save
      end
    end

    UserStock.find_each do |user_stock|
      last_stock_price = user_stock.stock.last_price
      user_stock.market_price_per_stock = last_stock_price.close
      user_stock.save
    end

    nil
  end

  def stock_price_data(code)
    cache_key = "stock_prices/alphavantage/TIME_SERIES_DAILY/#{Date.today.to_s}/#{code}.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s

    cached = fetch_cache cache_file

    unless cached
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{code}&apikey=#{ENV['ALPHA_VANTAGE_API_KEY']}"

      result = HTTParty.get(url)
      @i += 1

      if result.parsed_response["Error Message"] || result.parsed_response["Note"]
        puts "-> Deu pau #{code}"
        return []
      else
        puts @code
        cached = add_to_cache cache_file, result.body
      end

      if @i % 5 == 0
        sleep 61
      end
    end

    parsed_cache = JSON.parse(cached)

    begin
      parsed_cache["Time Series (Daily)"].map do |day, info|
        {
          day: day,
          open: info["1. open"],
          high: info["2. high"],
          low: info["3. low"],
          close: info["4. close"],
          volume: info["5. volume"],
        }
      end
    rescue StandardError => e
      ap e
      ap cached
      ap code
      return []
    end
  end
end
