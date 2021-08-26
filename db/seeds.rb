user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# Seeding
# Seeders::StockEarnings.new.seed # Expensive!!!!!!
puts "Stock Kpis..."
Seeders::StockKpis.new.seed
puts "Stock Prices..."
Seeders::StockPrices.new.seed

# Management
puts "Updating..."
Seeders::UserStockEarnings.new(user: user).seed
Seeders::UserStockOperations.new(user: user).seed
UserStocks::ConsolidateOperations.new(user: user).do
UserStocks::ConsolidateWallets.new(user: user).do
