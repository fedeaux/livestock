json.stock_trends do
  json.array! @stock_trends do |stock_trend|
    json.partial! "member", stock_trend: stock_trend
  end
end

json.cache_key StockTrend.cache_key
