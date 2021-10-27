task release: :environment do
end

task daily_job: :environment do
  Maintenance::DailyJob.perform_async
end

task pull_prod: :environment do
  response = Net::HTTP.get_response(URI.parse("https://livestock.fedeaux.com/api/stock_prices.json"))

  JSON.parse(response.body)['stockPrices'].each do |stock_price_json_entry|
    code = stock_price_json_entry['code']
    stock = Stock.c(code)

    unless stock
      puts "Not #{code}"
      next
    end

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
