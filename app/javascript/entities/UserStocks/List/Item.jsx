import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import { formatRelative } from "date-fns"
import formatMoney from "ui/formatters/money";

export default function UserStockListItem({ userStock }) {
  return (
    <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-200") }>
      <Text style={ tw("text-gray-600 font-semibold w-20") }>{userStock.code}</Text>
      <Text style={ tw("text-gray-600 w-20") }>{userStock.stockCount}</Text>
      <Text style={ tw("text-gray-600 w-60") }>
        {formatMoney(userStock.totalPrice)} | {formatMoney(userStock.averagePricePerStock)}
      </Text>
      <Text style={ tw("text-gray-600 w-60") }>
        {formatMoney(userStock.totalMarketPrice)} | {formatMoney(userStock.marketPricePerStock)}
      </Text>
      <Text style={ tw("text-gray-600 w-40") }>{formatMoney(userStock.totalEarnings)}</Text>
      <Text style={ tw("text-gray-600 w-40") }>{userStock.category}</Text>
    </View>
  );
}
