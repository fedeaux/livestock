user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# Seeders::Stocks.new.seed
# Seeders::RealState.new.seed
# Seeders::UserStockEarnings.new(user: user).seed

UserStockOperation.destroy_all
Seeders::UserStockOperations.new(user: user).seed

# Seeders::StockPrices.new.seed
Stocks::ConsolidateOperations.new(user: user).do
