json.user_stock_operations do
  json.array! @user_stock_operations do |user_stock_operation|
    json.partial! "member", user_stock_operation: user_stock_operation
  end
end
