json.stock do
  json.partial! "member", stock: @stock
end

json.cache_key @stock.cache_key
