json.partial! "attributes", user_stock: user_stock

json.stock do
  json.partial! "/api/stocks/attributes", stock: user_stock.stock
end
