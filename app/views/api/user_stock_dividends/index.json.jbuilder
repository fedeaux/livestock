json.user_stock_earnings do
  json.array! @user_stock_earnings do |user_stock_dividend|
    json.partial! "member", user_stock_dividend: user_stock_dividend
  end
end
