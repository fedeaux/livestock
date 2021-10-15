json.stocks do
  json.array! @stocks do |stock|
    json.partial! "member", stock: stock
  end
end

json.cache_key Stock.cache_key
