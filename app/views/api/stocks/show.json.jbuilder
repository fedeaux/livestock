json.stock do
  json.partial! "member", stock: @stock

  if @stock_prices
    json.stock_prices do
      json.array! @stock_prices do |stock_price|
        json.partial! "api/stock_prices/attributes", stock_price: stock_price
      end
    end
  end

  if @stock.active_trend
    json.active_trend do
      json.partial! "api/stock_trends/attributes", stock_trend: @stock.active_trend
    end
  end
end

json.cache_key @stock.cache_key
