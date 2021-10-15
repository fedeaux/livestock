json.stock_kpi do
  json.partial! "member", stock_kpi: @stock_kpi
end

json.cache_key @stock_kpi.cache_key
