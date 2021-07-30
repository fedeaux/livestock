# TODO

class Seeders::StockEarnings < Seeders::BaseSeeder
  def seed
    seed_earnings
  end

  def seed_earnings
    stocks_with_user_stocks.each do |stock|
      stock_earning_data("TAEE11.SA")
      break
    end
  end

  def stock_earning_data(code)
    cache_key = "stock_earnings/alphavantage/EARNINGS/#{code}/#{Date.today.strftime("%m-%Y")}.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s

    cached = fetch_cache cache_file

    unless cached
      url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=#{code}&apikey=#{ENV['ALPHA_VANTAGE_API_KEY']}"

      result = HTTParty.get(url)
      ap url
      ap result.body
      ap result.parsed_response
      puts "-> Sem cache"

      if result.parsed_response["Error Message"] || result.parsed_response["Note"]
        puts "-> Deu pau"
        return []
      else
        puts "-> Deu certo #{result.parsed_response.keys}"
        cached = result.body
        # cached = add_to_cache cache_file, result.body
      end
    end

    parsed_cache = JSON.parse(cached)

    begin
      puts cached
    rescue StandardError => e
      ap e
      ap cached
      ap code
      return []
    end
  end
end
