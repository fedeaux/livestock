task release: :environment do
end

task daily_job: :environment do
  Maintenance::DailyJob.perform_async
end

task pull_prod: :environment do
  response = Net::HTTP.get_response(URI.parse("https://livestock.fedeaux.com/api/user_stocks"))

  JSON.parse(response.body)['userStocks'].each do |user_stock_json_entry|
    stock_id = user_stock_json_entry['stockId']
    # stock_code = user_stock_json_entry['code']

    response = Net::HTTP.get_response(URI.parse("https://livestock.fedeaux.com/api/stocks/#{stock_id}.json?query=#{JSON.stringify({includes:{stockPrice:true}})}"))

    JSON.parse(response.body)['stock']['stockPrices'].each do |stock_price_json_entry|
      code = stock_price_json_entry['code']
      stock = Stock.c(code)

      unless stock
        puts "Not #{code}"
        next
      end

      break if stock.stock_prices.count > 10

      stock_price_attributes = stock_price_json_entry
                                 .slice(*%w[close day high low open volume])
                                 .merge(stock_id: stock.id)

      stock_price = stock.stock_prices
                      .where(stock_price_attributes).first_or_initialize

      unless stock_price.persisted?
        stock_price.save!
      end
    end
  end
end
