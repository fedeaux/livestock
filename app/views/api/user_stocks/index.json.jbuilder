json.user_stocks do
  json.array! @user_stocks do |user_stock|
    json.partial! "member", user_stock: user_stock
  end
end

json.cache_key UserStock.cache_key
