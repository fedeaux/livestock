json.stock do
  json.partial! "member", stock: @stock

  if @user_stock
    json.user_stock do
      json.partial! "api/user_stocks/attributes", user_stock: @user_stock
    end
  end

  if @stock_prices
    json.stock_prices do
      json.array! @stock_prices do |stock_price|
        json.partial! "api/stock_prices/attributes", stock_price: stock_price
      end
    end
  end

  if @active_trend
    json.active_trend do
      json.partial! "api/stock_trends/attributes", stock_trend: @stock.active_trend

      if @active_trend_prices
        json.stock_prices do
          json.array! @active_trend_prices do |stock_price|
            json.partial! "api/stock_prices/attributes", stock_price: stock_price
          end
        end
      end
    end
  end
end

json.cache_key @stock.cache_key @query
