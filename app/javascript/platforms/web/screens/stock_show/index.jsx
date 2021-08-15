import React, { useCallback, useMemo, useState } from "react";

import Stock from "models/stock";
import MainTitle from "ui/typography/MainTitle";
import SecondaryTitle from "ui/typography/SecondaryTitle";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

// TODO: Remove this
async function apiStockGet(id) {
  return fetch(`/api/stocks/${id}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
      {stockEarnings.map((stockEarning) => {
        return (
          <View
            key={stockEarning.id}
            style={tw("px-4 py-2 flex flex-row border-b border-gray-200")}
          >
            <Text style={tw("text-gray-600 px-2 w-30")}>
              {format(stockEarning.receivedAt, "dd/MMM/yyyy")}
            </Text>
            <Text style={tw("text-gray-600 px-2 w-24")}>
              {formatMoney(stockEarning.perStock)}
            </Text>
            <Text style={tw("text-gray-600 px-2 w-40")}>
              {stockEarning.category}
            </Text>
          </View>
        );
      })}
    </>
  );
}

export default function StockShowIndex() {
  const { id } = useParams();
  const { stock } = useStockGet(id);

  if (!stock) return null;

  return (
    <View style={tw("p-4")}>
      <MainTitle>{stock.code}</MainTitle>
      <View style={tw("flex-row")}>
        <View style={tw("flex-grow")}>
          <SecondaryTitle> Earnings </SecondaryTitle>
          <StockEarningList stockEarnings={stock.stockEarnings} />
        </View>
        <View style={tw("flex-grow")}></View>
      </View>
    </View>
  );
}
