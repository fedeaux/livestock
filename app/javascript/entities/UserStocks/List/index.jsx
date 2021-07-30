import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import UserStockListItem from "entities/UserStocks/List/Item";

function processUserStocks(userStocks, options) {
  const processedUserStocks = userStocks.filter((userStock) => {
    return (!options.showActiveOnly || userStock.isActive);
  }).sort((usa, usb) => {
    return usa.code.localeCompare(usb.code);
  });

  return processedUserStocks;
}

export default function UserStockList({ userStocks }) {
  const [processedUserStocks, setProcessedUserStocks] = useState([]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [sortBy, setSortBy] = useState("code");

  useEffect(() => {
    setProcessedUserStocks(processUserStocks(userStocks, { showActiveOnly, sortBy }));
  }, [userStocks])

  return (
    <View>
      <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-300") }>
        <Text style={ tw("w-20") } />
        <Text style={ tw("text-gray-400 font-bold w-20") }>Count</Text>
        <Text style={ tw("text-gray-400 font-bold w-60") }>Buying Price</Text>
        <Text style={ tw("text-gray-400 font-bold w-60") }>Market Price</Text>
        <Text style={ tw("text-gray-400 font-bold w-40") }>Earnings</Text>
        <Text style={ tw("text-gray-400 font-bold w-40") }>Category</Text>
      </View>

      {
        processedUserStocks.map((userStock) => {
          return <UserStockListItem key={userStock.id} userStock={userStock} />
        })
      }
    </View>
  );
}
