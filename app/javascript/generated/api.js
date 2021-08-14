import UserStockEarning from 'models/user_stock_earning';

import getModelCollection from 'braindamage/api/getModelCollection';
import useQuery from 'braindamage/api/useQuery';

export function useUserStockEarnings() {
  return useQuery(getModelCollection, ['user_stock_earnings', UserStockEarning]);
}
