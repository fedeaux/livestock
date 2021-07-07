import { withModelQuery } from 'braindamage/query_hooks';
import Stock from 'models/stock';
import UserStock from 'models/user_stock';
import UserStockDividend from 'models/user_stock_dividend';

export function withStocks(Component, params = {}, options = {}) {
  return withModelQuery(Component, Stock, "/api/stocks.json", params, options);
}

export function withUserStocks(Component, params = {}, options = {}) {
  return withModelQuery(Component, UserStock, "/api/user_stocks.json", params, options);
}

export function withUserStockDividends(Component, params = {}, options = {}) {
  return withModelQuery(Component, UserStockDividend, "/api/user_stock_dividends.json", params, options);
}
