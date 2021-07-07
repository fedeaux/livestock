json.user_stock_dividends do
  json.array! @user_stock_dividends do |user_stock_dividend|
    json.partial! "member", user_stock_dividend: user_stock_dividend
  end
end
