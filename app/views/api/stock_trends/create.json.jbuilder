json.stock_trend do
  json.partial! "member", stock_trend: @stock_trend
end

json.cache_key @stock_trend.cache_key
