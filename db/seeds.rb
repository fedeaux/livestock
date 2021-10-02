user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# Seeding
# puts "Stock Kpis..."
# Seeders::StockKpis.new.seed
# Management
puts "Syncing Earnings and Operations..."
Seeders::UserStockEarnings.new(user: user).seed
Seeders::UserStockOperations.new(user: user).seed

# puts "Stock Prices..."
Seeders::StockPrices.new.seed

puts "Consolidation..."
UserStocks::ConsolidateOperations.new(user: user).do
UserStocks::ConsolidateWallets.new(user: user).do

# Expensive!!!!!!
# Seeders::HistoricalStockPrices.new.seed
# Seeders::StockEarnings.new.seed
