json.stock_earnings do
  json.array! @stock_earnings do |stock_earning|
    json.partial! "member", stock_earning: stock_earning
  end
end