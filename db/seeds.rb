user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

consolidate_wallets = UserStocks::ConsolidateWallets.new(user: user)
consolidate_wallets.duct_tapped_ensure_user_stock_wallets

# Seeding
# puts "Stock Kpis..."
# Seeders::StockKpis.new.seed
# Management
puts "Syncing Earnings and Operations..."
Seeders::UserStockEarnings.new(user: user).seed
Seeders::UserStockOperations.new(user: user).seed

puts "Stock Prices..."
Seeders::StockPrices.new.seed

puts "Consolidation..."
UserStocks::ConsolidateOperations.new(user: user).do
consolidate_wallets.do

# Expensive!!!!!!
# Seeders::HistoricalStockPrices.new.seed
# Seeders::StockEarnings.new.seed
