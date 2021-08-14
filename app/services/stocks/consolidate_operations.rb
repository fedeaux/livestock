class Stocks::ConsolidateOperations
  def initialize(user:)
    @user = user
  end

  def do
    @user
      .user_stocks
      .includes(:stock)
      .each do |user_stock|
        stock_count = 0
        price = 0
        earnings = 0

        user_stock.user_stock_operations.order("executed_at ASC").each do |user_stock_operation|
          if user_stock_operation.buy?
            stock_count += user_stock_operation.stock_count
            price += user_stock_operation.total
          else
            stock_count -= user_stock_operation.stock_count
            price -= user_stock_operation.total
          end
        end

        user_stock.user_stock_earnings.each do |user_stock_earning|
          earnings += user_stock_earning.total
        end

        average_price_per_stock = if stock_count == 0
                                    0
                                  else
                                    price / stock_count
                                  end

        user_stock.update(
          stock_count: stock_count,
          price: price,
          average_price_per_stock: average_price_per_stock,
          earnings: earnings
        )
    end
  end
end
