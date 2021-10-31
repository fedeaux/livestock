class Seeders::Daily < Seeders::BaseSeeder
  def seed
    # puts "Syncing Earnings and Operations..."
    # Seeders::UserStockEarnings.new(user: user).seed
    # Seeders::UserStockOperations.new(user: user).seed

    puts "Stock Prices..."
    Seeders::StockPrices.new.seed

    puts "Consolidation..."
    UserStocks::ConsolidateOperations.new(user: user).do
    UserStocks::ConsolidateWallets.new(user: user).do
  end

  def user
    User.find_by(email: 'phec06@gmail.com')
  end
end
