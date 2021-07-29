user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

Seeders::UserStockDividends.new(user: user).seed
Seeders::UserStockOperations.new(user: user).seed
Seeders::Stocks.new.seed
