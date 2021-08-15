user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# Seeders::Stocks.new.seed
# Seeders::RealState.new.seed
Seeders::UserStockEarnings.new(user: user).seed
Seeders::UserStockOperations.new(user: user).seed
Seeders::StockPrices.new.seed
Stocks::ConsolidateOperations.new(user: user).do
UserStocks::ConsolidateWallets.new(user: user).do
# Seeders::StockEarnings.new.seed # Expensive!!!!!!
