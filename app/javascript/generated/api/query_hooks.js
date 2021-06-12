import { withModelQuery } from 'braindamage/query_hooks'
import Stock from 'models/stock'

export function withStocks(Component, params = {}, options = {}) {
  return withModelQuery(Component, Stock, "/api/stocks.json", params, options);
}
