json.stock_earning do
  json.partial! "member", stock_earning: @stock_earning
end

json.cache_key @stock_earning.cache_key
