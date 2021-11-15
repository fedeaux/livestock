json.user_stock_operation do
  json.partial! "member", user_stock_operation: @user_stock_operation
end

json.cache_key @user_stock_operation.cache_key(@query)
