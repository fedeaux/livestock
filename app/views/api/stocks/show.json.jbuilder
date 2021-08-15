json.stock do
  json.partial! "member", stock: @stock
  json.stock_earnings do
    json.array! @stock.stock_earnings.order("received_at DESC") do |stock_earning|
      json.partial! "/api/stock_earnings/attributes", stock_earning: stock_earning
    end
  end
  json.stock_kpis do
    json.array! @stock.stock_kpis.order("date DESC") do |stock_kpi|
      json.partial! "/api/stock_kpis/attributes", stock_kpi: stock_kpi
    end
  end
end
