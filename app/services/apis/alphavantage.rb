# TODO

class Apis::Alphavantage
  def earnings(code)
    cache_key = "stock_prices/alphavantage/#{function}/#{code}/#{Date.today.strftime("%m-%Y")}.json"
  end

  def time_series_daily(code)
    cache_key = "stock_prices/alphavantage/#{function}/#{code}/#{Date.today.strftime("%m-%Y")}.json"
  end

  def request(function, code)
  end
end
