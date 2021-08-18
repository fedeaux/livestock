user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# Seeders::Stocks.new.seed
# Seeders::RealState.new.seed
# Seeders::StockEarnings.new.seed # Expensive!!!!!!
Seeders::StockKpis.new.seed

# Management
# Seeders::UserStockEarnings.new(user: user).seed
# Seeders::UserStockOperations.new(user: user).seed
# Seeders::StockPrices.new.seed
UserStocks::ConsolidateOperations.new(user: user).consolidate_user_stock_operations(UserStock.c("OIBR3"))
# UserStocks::ConsolidateWallets.new(user: user).do
