# BD-TODO: Interpret Includes
json.user_stock do
  json.partial! "member", user_stock: @user_stock

  json.user_stock_operations do
    json.array! @user_stock.user_stock_operations do |user_stock_operation|
      json.partial! "/api/user_stock_operations/attributes", user_stock_operation: user_stock_operation
    end
  end

  json.user_stock_earnings do
    json.array! @user_stock.user_stock_earnings do |user_stock_earning|
      json.partial! "/api/user_stock_earnings/attributes", user_stock_earning: user_stock_earning
    end
  end

  json.stock do
    json.stock_earnings do
      json.array! @user_stock.stock.stock_earnings.order("received_at DESC") do |stock_earning|
        json.partial! "/api/stock_earnings/attributes", stock_earning: stock_earning
      end
    end
    json.stock_kpis do
      json.array! @user_stock.stock.stock_kpis.order("date DESC") do |stock_kpi|
        json.partial! "/api/stock_kpis/attributes", stock_kpi: stock_kpi
      end
    end
  end
end
