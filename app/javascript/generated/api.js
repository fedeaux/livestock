import { BraindamageApiContext } from "braindamage/api/provider";

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import createModelMember from 'braindamage/api/createModelMember';
import destroyModelMember from 'braindamage/api/destroyModelMember';
import updateModelMember from 'braindamage/api/updateModelMember';

import useQuery from 'braindamage/api/useQuery';
import useWrite from 'braindamage/api/useWrite';

import Stock from 'models/stock';
import StockEarning from 'models/stock_earning';
import StockKpi from 'models/stock_kpi';
import StockPrice from 'models/stock_price';
import UserStock from 'models/user_stock';
import UserStockEarning from 'models/user_stock_earning';
import UserStockOperation from 'models/user_stock_operation';
import Wallet from 'models/wallet';

export function useApiStockEarnings(query) {
  const endpoint = '/api/stock_earnings';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, StockEarning, query]);
}

export function useApiStockKpis(query) {
  const endpoint = '/api/stock_kpis';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, StockKpi, query]);
}

export function useApiStockPrices(query) {
  const endpoint = '/api/stock_prices';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, StockPrice, query]);
}

export function useApiStocks(query) {
  const endpoint = '/api/stocks';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, Stock, query]);
}

export function useApiUserStockEarnings(query) {
  const endpoint = '/api/user_stock_earnings';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, UserStockEarning, query]);
}

export function useApiUserStockOperations(query) {
  const endpoint = '/api/user_stock_operations';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, UserStockOperation, query]);
}

export function useApiUserStocks(query) {
  const endpoint = '/api/user_stocks';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, UserStock, query]);
}

export function useApiWallets(query) {
  const endpoint = '/api/wallets';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, Wallet, query]);
}

export function useApiStockEarning(stockEarningId) {
  const endpoint = `/api/stock_earnings/${stockEarningId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, StockEarning, stockEarningId]);
}

export function useApiStockKpi(stockKpiId) {
  const endpoint = `/api/stock_kpis/${stockKpiId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, StockKpi, stockKpiId]);
}

export function useApiStockPrice(stockPriceId) {
  const endpoint = `/api/stock_prices/${stockPriceId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, StockPrice, stockPriceId]);
}

export function useApiStock(stockId) {
  const endpoint = `/api/stocks/${stockId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, Stock, stockId]);
}

export function useApiUserStockEarning(userStockEarningId) {
  const endpoint = `/api/user_stock_earnings/${userStockEarningId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, UserStockEarning, userStockEarningId]);
}

export function useApiUserStockOperation(userStockOperationId) {
  const endpoint = `/api/user_stock_operations/${userStockOperationId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, UserStockOperation, userStockOperationId]);
}

export function useApiUserStock(userStockId) {
  const endpoint = `/api/user_stocks/${userStockId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, UserStock, userStockId]);
}

export function useApiWallet(walletId) {
  const endpoint = `/api/wallets/${walletId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, Wallet, walletId]);
}

export function useApiUpdateStockEarning() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stock_earnings/:stockEarningId', StockEarning]);

  return { update, ...rest };
}

export function useApiUpdateStockKpi() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stock_kpis/:stockKpiId', StockKpi]);

  return { update, ...rest };
}

export function useApiUpdateStockPrice() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stock_prices/:stockPriceId', StockPrice]);

  return { update, ...rest };
}

export function useApiUpdateStock() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/stocks/:stockId', Stock]);

  return { update, ...rest };
}

export function useApiUpdateUserStockEarning() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/user_stock_earnings/:userStockEarningId', UserStockEarning]);

  return { update, ...rest };
}

export function useApiUpdateUserStockOperation() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/user_stock_operations/:userStockOperationId', UserStockOperation]);

  return { update, ...rest };
}

export function useApiUpdateUserStock() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/user_stocks/:userStockId', UserStock]);

  return { update, ...rest };
}

export function useApiUpdateWallet() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/wallets/:walletId', Wallet]);

  return { update, ...rest };
}

export function useApiCreateStockEarning() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/stock_earnings', StockEarning]);

  return { create, ...rest };
}

export function useApiCreateStockKpi() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/stock_kpis', StockKpi]);

  return { create, ...rest };
}

export function useApiCreateStockPrice() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/stock_prices', StockPrice]);

  return { create, ...rest };
}

export function useApiCreateStock() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/stocks', Stock]);

  return { create, ...rest };
}

export function useApiCreateUserStockEarning() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/user_stock_earnings', UserStockEarning]);

  return { create, ...rest };
}

export function useApiCreateUserStockOperation() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/user_stock_operations', UserStockOperation]);

  return { create, ...rest };
}

export function useApiCreateUserStock() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/user_stocks', UserStock]);

  return { create, ...rest };
}

export function useApiCreateWallet() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/wallets', Wallet]);

  return { create, ...rest };
}

export function useApiDestroyStockEarning() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/stock_earnings/:stockEarningId', StockEarning]);

  return { destroy, ...rest };
}

export function useApiDestroyStockKpi() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/stock_kpis/:stockKpiId', StockKpi]);

  return { destroy, ...rest };
}

export function useApiDestroyStockPrice() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/stock_prices/:stockPriceId', StockPrice]);

  return { destroy, ...rest };
}

export function useApiDestroyStock() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/stocks/:stockId', Stock]);

  return { destroy, ...rest };
}

export function useApiDestroyUserStockEarning() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/user_stock_earnings/:userStockEarningId', UserStockEarning]);

  return { destroy, ...rest };
}

export function useApiDestroyUserStockOperation() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/user_stock_operations/:userStockOperationId', UserStockOperation]);

  return { destroy, ...rest };
}

export function useApiDestroyUserStock() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/user_stocks/:userStockId', UserStock]);

  return { destroy, ...rest };
}

export function useApiDestroyWallet() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/wallets/:walletId', Wallet]);

  return { destroy, ...rest };
}
