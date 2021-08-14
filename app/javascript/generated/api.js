import Stock from 'models/stock';
import StockEarning from 'models/stock_earning';
import UserStock from 'models/user_stock';
import UserStockEarning from 'models/user_stock_earning';
import Wallet from 'models/wallet';

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import useQuery from 'braindamage/api/useQuery';

export function useApiWallets() {
  return useQuery(getModelCollection, ['/api/wallets', Wallet]);
}

export function useApiWallet(walletId) {
  return useQuery(getModelMember, [`/api/wallets/${walletId}`, Wallet]);
}

export function useApiStocks() {
  return useQuery(getModelCollection, ['/api/stocks', Stock]);
}

export function useApiStock(stockId) {
  return useQuery(getModelMember, [`/api/stocks/${stockId}`, Stock]);
}

export function useApiStockEarnings() {
  return useQuery(getModelCollection, ['/api/stock_earnings', StockEarning]);
}

export function useApiStockEarning(stockEarningId) {
  return useQuery(getModelMember, [`/api/stock_earnings/${stockEarningId}`, StockEarning]);
}

export function useApiUserStocks() {
  return useQuery(getModelCollection, ['/api/user_stocks', UserStock]);
}

export function useApiUserStock(userStockId) {
  return useQuery(getModelMember, [`/api/user_stocks/${userStockId}`, UserStock]);
}

export function useApiUserStockEarnings() {
  return useQuery(getModelCollection, ['/api/user_stock_earnings', UserStockEarning]);
}

export function useApiUserStockEarning(userStockEarningId) {
  return useQuery(getModelMember, [`/api/user_stock_earnings/${userStockEarningId}`, UserStockEarning]);
}
