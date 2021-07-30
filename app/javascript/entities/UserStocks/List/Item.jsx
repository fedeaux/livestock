import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import { formatRelative } from "date-fns"
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import ColoredAmountAndRate from "ui/typography/ColoredAmountAndRate";
import tableGrid from "entities/UserStocks/List/tableGrid";

function UserStockListItemPayout({ userStock }) {
  return (
    <ColoredAmountAndRate
      amount={userStock.currentPayout}
      rate={userStock.currentPayoutRate}
      className={ ["text-center", tableGrid[5]].join(" ") }
    />
  );
}

function UserStockListItemEarnings({ userStock }) {
  let value = userStock.totalEarnings;

  if (value == 0) {
    value = '-';
  } else {
    value = formatMoney(userStock.totalEarnings);
  }

  return (
    <Text style={ tw("text-gray-600 text-center", tableGrid[4]) }>{value}</Text>
  );
}

export default function UserStockListItem({ userStock }) {
  return (
    <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-200") }>
      <Text style={ tw("text-gray-600 font-semibold text-center", tableGrid[0]) }>{userStock.code}</Text>
      <Text style={ tw("text-gray-600 text-center", tableGrid[1]) }>{userStock.stockCount}</Text>
      <Text style={ tw("text-gray-600 text-center", tableGrid[2]) }>
        {formatMoney(userStock.totalPrice)} | {formatMoney(userStock.averagePricePerStock)}
      </Text>
      <Text style={ tw("text-gray-600 text-center", tableGrid[3]) }>
        {formatMoney(userStock.totalMarketPrice)} | {formatMoney(userStock.marketPricePerStock)}
      </Text>
      <UserStockListItemEarnings userStock={userStock} />
      <UserStockListItemPayout userStock={userStock} />
      <Text style={ tw("text-gray-600 w-40 text-center", tableGrid[6]) }>{userStock.category}</Text>
    </View>
  );
}
