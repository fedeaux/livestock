class Seeders::HistoricalStockPrices < Seeders::BaseSeeder
  def initialize(stock_codes = nil)
    @i = 0
    @stock_codes = stock_codes
  end

  def seed
    seed_prices
  end

  def seed_prices
    stocks_to_seed.each do |stock|
      stock_prices_attributes = stock_price_data(stock.international_code)

      stock_prices_attributes.each do |stock_price_attributes|
        stock_price = stock.stock_prices.where(day: stock_price_attributes[:day]).first_or_initialize
        stock_price.assign_attributes(stock_price_attributes)
        was_persisted = stock_price.persisted?
        stock_price.save
        break if was_persisted
      end
    end

    nil
  end

  def stocks_to_seed
    if @stock_codes
      @stock_codes.map do |code|
        Stock.c(code)
      end
    else
      stocks_with_user_stocks
    end
  end

  def stock_price_data(code)
    day_signature = Date.today.to_s

    cache_key = "stock_prices/alphavantage/TIME_SERIES_DAILY_ADJUSTED/#{day_signature}/#{code}.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s

    cached = fetch_cache cache_file

    unless cached
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{code}&apikey=#{ENV['ALPHA_VANTAGE_API_KEY']}&outputsize=full"

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
        adjusted_close = info["5. adjusted close"].to_f
        close = info["4. close"].to_f
        factor = adjusted_close / close

        {
          day: day,
          open: info["1. open"].to_f * factor,
          high: info["2. high"].to_f * factor,
          low: info["3. low"].to_f * factor,
          close: adjusted_close,
          volume: info["6. volume"],
          dividend_amount: info["7. dividend amount"].to_f,
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
