class Seeders::Daily < Seeders::BaseSeeder
  def seed
    # puts "Syncing Earnings and Operations..."
    # Seeders::UserStockEarnings.new(user: user).seed
    # Seeders::UserStockOperations.new(user: user).seed

    stock_trends_seeder = Seeders::StockTrends.new
    # puts "Stock Prices..."
    stock_trends_seeder.trending_stocks.keys.each do |stock_code|
      stock = Stock.c stock_code
      next unless stock

      UserStock.where(user: user, stock: stock).first_or_create
    end

    # Seeders::HistoricalStockPrices.new.seed
    stock_trends_seeder.seed

    puts "Consolidation..."
    UserStocks::ConsolidateOperations.new(user: user).do
    UserStocks::ConsolidateWallets.new(user: user).do
  end

  def user
    User.find_by(email: 'phec06@gmail.com')
  end
end
