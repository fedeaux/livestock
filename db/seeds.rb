user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# consolidate_wallets = UserStocks::ConsolidateWallets.new(user: user)
# consolidate_wallets.duct_tapped_ensure_user_stock_wallets

# Seeding
# puts "Stock Kpis..."
# Seeders::StockKpis.new.seed
# Management
# Seeders::Daily.new.seed

# Expensive!!!!!!
# Seeders::HistoricalStockPrices.new.seed
# Seeders::StockEarnings.new.seed

# RAPT4
# ROMI3

{
  'B3SA3' =>  '19/02/2021',
  'BBAS3' => '14/09/2021',
  'BBSE3' => '10/09/2021',
  'BRAP3' => '13/09/2021',
  'CMIG4' => '02/04/2020',
  'CPLE6' => '06/03/2021',
  'CSMG3' => '10/03/2020',
  'ENBR3' => '30/03/2020',
  'EVEN3' => '01/06/2021',
  'GOAU4' => '11/05/2021',
  'GRND3' => '11/08/2021',
  'PETR4' => '22/02/2021',
  'RAPT4' => '20/07/2021',
  'ROMI3' => '01/06/2021',
  'VBBR3' => '23/07/2021',
  'TAEE11' => '14/06/2021',
  'TIMS3' => '14/01/2021',
  'TRPL4' => '08/12/2020',
  'UNIP6' => '04/08/2021',
  'VIVT3' => '06/03/2020',
  'WIZS3' => '26/07/2021',
}.each do |code, started_at|
  stock = Stock.c(code)

  next unless stock

  stock_trend = stock
                  .stock_trends
                  .where(started_at: started_at)
                  .first_or_create

  StockTrends::Calculate.new(
    stock_trend.id
  ).call
end
