json.user_stock do
  json.partial! "member", user_stock: @user_stock
end

json.cache_key @user_stock.cache_key
