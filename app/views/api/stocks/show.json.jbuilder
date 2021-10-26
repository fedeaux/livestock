json.stock do
  json.partial! "member", stock: @stock

  json.stock_prices do
    json.array! @stock.stock_prices.order(:day) do |stock_price|
      json.partial! "api/stock_prices/attributes", stock_price: stock_price
    end
  end
end

json.cache_key @stock.cache_key
