json.stocks do
  json.array! @stocks do |stock|
    json.partial! "member", stock: stock
  end
end
