json.stock_kpis do
  json.array! @stock_kpis do |stock_kpi|
    json.partial! "member", stock_kpi: stock_kpi
  end
end

json.cache_key StockKpi.cache_key(@query)
