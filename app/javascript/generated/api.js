import { useContext } from "react";
import { BraindamageApiContext } from "braindamage/api/provider";

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import updateModelMember from 'braindamage/api/updateModelMember';
import useQuery from 'braindamage/api/useQuery';
import useWrite from 'braindamage/api/useWrite';

import Stock from 'models/stock';
import StockEarning from 'models/stock_earning';
import StockKpi from 'models/stock_kpi';
import UserStock from 'models/user_stock';
import UserStockEarning from 'models/user_stock_earning';
import Wallet from 'models/wallet';

export function useApiWallets() {
  const queryCacheKey = '/api/wallets';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, Wallet]);
}

export function useApiWallet(walletId) {
  const queryCacheKey = `/api/wallets/${walletId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, Wallet]);
}

export function useApiStocks() {
  const queryCacheKey = '/api/stocks';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, Stock]);
}

export function useApiStock(stockId) {
  const queryCacheKey = `/api/stocks/${stockId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, Stock]);
}

export function useApiStockEarnings() {
  const queryCacheKey = '/api/stock_earnings';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, StockEarning]);
}

export function useApiStockEarning(stockEarningId) {
  const queryCacheKey = `/api/stock_earnings/${stockEarningId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, StockEarning]);
}

export function useApiStockKpis() {
  const queryCacheKey = '/api/stock_kpis';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, StockKpi]);
}

export function useApiStockKpi(stockKpiId) {
  const queryCacheKey = `/api/stock_kpis/${stockKpiId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, StockKpi]);
}

export function useApiUserStocks() {
  const queryCacheKey = '/api/user_stocks';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, UserStock]);
}

export function useApiUserStock(userStockId) {
  const queryCacheKey = `/api/user_stocks/${userStockId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, UserStock]);
}

export function useApiUserStockEarnings() {
  const queryCacheKey = '/api/user_stock_earnings';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, UserStockEarning]);
}

export function useApiUserStockEarning(userStockEarningId) {
  const queryCacheKey = `/api/user_stock_earnings/${userStockEarningId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, UserStockEarning]);
}

export function useApiUpdateWallet() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/wallets/:walletId', Wallet]);

  return { update, ...rest };
}

export function useApiUpdateStock() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stocks/:stockId', Stock]);

  return { update, ...rest };
}

export function useApiUpdateStockEarning() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stock_earnings/:stockEarningId', StockEarning]);

  return { update, ...rest };
}

export function useApiUpdateStockKpi() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stock_kpis/:stockKpiId', StockKpi]);

  return { update, ...rest };
}

export function useApiUpdateUserStock() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/user_stocks/:userStockId', UserStock]);

  return { update, ...rest };
}

export function useApiUpdateUserStockEarning() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/user_stock_earnings/:userStockEarningId', UserStockEarning]);

  return { update, ...rest };
}
