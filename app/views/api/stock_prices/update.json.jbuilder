json.stock_price do
  json.partial! "member", stock_price: @stock_price
end

json.cache_key @stock_price.cache_key
