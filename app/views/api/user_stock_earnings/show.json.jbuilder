json.user_stock_earning do
  json.partial! "member", user_stock_earning: @user_stock_earning
end

json.cache_key @user_stock_earning.cache_key(@query)
