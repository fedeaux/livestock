json.stock_prices do
  json.array! @stock_prices do |stock_price|
    json.partial! "member", stock_price: stock_price
  end
end

json.cache_key StockPrice.cache_key
