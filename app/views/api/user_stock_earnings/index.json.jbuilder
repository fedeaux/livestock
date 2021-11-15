json.user_stock_earnings do
  json.array! @user_stock_earnings do |user_stock_earning|
    json.partial! "member", user_stock_earning: user_stock_earning
  end
end

json.cache_key UserStockEarning.cache_key(@query)
