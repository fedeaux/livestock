task release: :environment do
end

task daily_job: :environment do
  Maintenance::DailyJob.perform_async
end

task pull_prod: :environment do
  response = Net::HTTP.get_response(URI.parse("https://livestock.fedeaux.com/api/user_stocks"))

  JSON.parse(response.body)['userStocks'].each do |user_stock_json_entry|
    stock_id = user_stock_json_entry['stockId']
    stock_code = user_stock_json_entry['code']
    stock = Stock.c(stock_code)

    puts "#{stock_code}..."

    unless stock
      puts "  No stock #{code}"
      next
    end

    url = URI.parse("https://livestock.fedeaux.com/api/stocks/#{stock_id}.json?query=#{({includes:{stockPrices:true}}.to_json)}")

    response = Net::HTTP.get_response(url)

    prices = JSON.parse(response.body)['stock']['stockPrices']

    unless prices
      puts "  No prices"
    end

    if stock.stock_prices.count == prices.count
      puts "  Already seeded"
      next
    end

    prices.each do |stock_price_json_entry|
      stock_price_attributes = stock_price_json_entry
                                 .slice(*%w[close day high low open volume])
                                 .merge(stock_id: stock.id)

      stock_price = stock
                      .stock_prices
                      .where(day: stock_price_attributes['day'])
                      .first_or_initialize

      next if stock_price.persisted?

      stock_price.assign_attributes(stock_price_attributes)
      stock_price.save!
    end
  end
end
