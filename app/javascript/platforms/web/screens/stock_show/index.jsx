import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import Stock from 'models/stock';
import MainTitle from 'ui/typography/MainTitle';
import formatMoney from 'ui/formatters/money';
import formatPercentage from 'ui/formatters/percentage';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

async function apiStockGet(id) {
  return fetch(`/api/stocks/${id}.json`).then((response) => {
    return response.json();
  }).then((data) => {
    return { ...data, stock: new Stock(data.stock) };
  });
}

function useStockGet(id) {
  const [stock, setStock] = useState(null);

  useEffect(async () => {
    const response = await apiStockGet(id);
    setStock(response.stock);
  }, []);

  return { stock };
}

function StockEarningList({ stockEarnings }) {
  return (
    <>
      {
        stockEarnings.map((stockEarning) => {
          return (
            <View key={stockEarning.id} style={ tw('px-4 py-2 flex flex-row border-b border-gray-200') }>
              <Text style={ tw('text-gray-600 px-2 w-24') }>
                {format(stockEarning.receivedAt, 'MMM/yyyy')}
              </Text>
              <Text style={ tw('text-gray-600 px-2 w-24') }>
                {formatMoney(stockEarning.perStock)}
              </Text>
            </View>
          );
        })
      }
    </>
  );
}

export default function StockShowIndex() {
  const { id } = useParams();
  const { stock } = useStockGet(id);

  if(!stock) return null;

  return (
    <View style={ tw('p-4') }>
      <MainTitle>{stock.code}</MainTitle>
      <StockEarningList stockEarnings={stock.stockEarnings} />
    </View>
  );
}
