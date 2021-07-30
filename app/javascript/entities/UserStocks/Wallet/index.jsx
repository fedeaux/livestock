import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";

function UserStockWalletByCategory({ walletByCategory }) {
  const stockTableGrid = [
    "w-20",
    "w-60",
    "w-60",
    "w-60"
  ]

  return (
    <>
      <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-300") }>
        <Text style={ tw("text-gray-400 font-bold text-center", stockTableGrid[0]) }> Category </Text>
        <Text style={ tw("text-gray-400 font-bold text-center", stockTableGrid[1]) }> Price </Text>
        <Text style={ tw("text-gray-400 font-bold text-center", stockTableGrid[2]) }> Market Price </Text>
        <Text style={ tw("text-gray-400 font-bold text-center", stockTableGrid[3]) }> Earnings </Text>
      </View>
      {
        Object.entries(walletByCategory).map(([category, { totalPrice, priceRatio, totalMarketPrice, marketPriceRatio, totalEarnings, earningsRatio }]) => {
          return (
            <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-200") } key={category}>
              <Text style={ tw("text-gray-600 font-semibold text-center", stockTableGrid[0]) }>
                {category}
              </Text>
              <Text style={ tw("text-gray-600 text-center", stockTableGrid[1]) }>
                {formatMoney(totalPrice)} ({formatPercentage(priceRatio)})
              </Text>
              <Text style={ tw("text-gray-600 text-center", stockTableGrid[2]) }>
                {formatMoney(totalMarketPrice)} ({formatPercentage(marketPriceRatio)})
              </Text>
              <Text style={ tw("text-gray-600 text-center", stockTableGrid[3]) }>
                {formatMoney(totalEarnings)} ({formatPercentage(earningsRatio)})
              </Text>
            </View>
          );
        })
      }
    </>
  )
}


function evalWallet(processUserStocks) {
  const byCategory = {};
  let totalPrice = 0;
  let totalMarketPrice = 0;
  let totalEarnings = 0;

  processUserStocks.forEach((userStock) => {
    if (! byCategory[userStock.category]) {
      byCategory[userStock.category] = { totalMarketPrice: 0, totalPrice: 0, totalEarnings: 0 };
    }

    byCategory[userStock.category].totalPrice += userStock.totalPrice;
    byCategory[userStock.category].totalMarketPrice += userStock.totalMarketPrice;
    byCategory[userStock.category].totalEarnings += userStock.totalEarnings;

    totalPrice += userStock.totalPrice;
    totalMarketPrice += userStock.totalMarketPrice;
    totalEarnings += userStock.totalEarnings;
  })

  Object.keys(byCategory).forEach((category) => {
    byCategory[category].priceRatio = byCategory[category].totalPrice / totalPrice;
    byCategory[category].marketPriceRatio = byCategory[category].totalMarketPrice / totalMarketPrice;
    byCategory[category].earningsRatio = byCategory[category].totalEarnings / totalEarnings;
  });

  return { byCategory };
}

export default function UserStockWallet({ userStocks }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    setWallet(evalWallet(userStocks));
  }, [userStocks])

  if (!wallet) return null;

  return (
    <UserStockWalletByCategory walletByCategory={wallet.byCategory} />
  );
}
