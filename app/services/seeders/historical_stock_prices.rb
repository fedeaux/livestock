class Seeders::HistoricalStockPrices < Seeders::BaseSeeder
  def initialize
    @i = 0
    super
  end

  def seed
    seed_prices
  end

  def seed_prices
    stocks = Stock.market.brl
    # stocks = %w[taee11 trpl4 cple6 bbas3 bbse3 brap3 csmg3 sapr11 klbn11 grnd3].map do |code|
    #   Stock.c(code)
    # end

    stocks.each do |stock|
      stock_prices_attributes = stock_price_data(stock.international_code)

      stock_prices_attributes.each do |stock_price_attributes|
        stock_price = stock.stock_prices.where(stock_price_attributes).first_or_initialize
        stock_price.save
      end
    end

    nil
  end

  def stock_price_data(code)
    day_signature = '2021-09-02'

    cache_key = "stock_prices/alphavantage/TIME_SERIES_MONTHLY_ADJUSTED/#{day_signature}/#{code}.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s

    cached = fetch_cache cache_file
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=#{code}&apikey=#{ENV['ALPHA_VANTAGE_API_KEY']}"

    unless cached
      result = HTTParty.get(url)
      @i += 1

      if result.parsed_response["Error Message"] || result.parsed_response["Note"]
        puts "-> Deu pau #{code}"
        puts result.parsed_response["Error Message"] || result.parsed_response["Note"]
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
      parsed_cache["Monthly Adjusted Time Series"].map do |day, info|
        # puts "#{day} #{info['']} #{info['4. close']} #{info['7. dividend amount']}"

        {
          day: day,
          open: info["1. open"],
          high: info["2. high"],
          low: info["3. low"],
          close: info["5. adjusted close"],
          volume: info["6. volume"],
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
