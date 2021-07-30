import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import UserStockListItem from "entities/UserStocks/List/Item";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import ColoredAmountAndRate from "ui/typography/ColoredAmountAndRate";
import MainTitle from "ui/typography/MainTitle";
import tableGrid from "entities/UserStocks/List/tableGrid";
import UserStockWallet from "entities/UserStocks/Wallet";

function processUserStocks(userStocks, options) {
  const processedUserStocks = userStocks.filter((userStock) => {
    return (!options.showActiveOnly || userStock.isActive);
  }).sort((usa, usb) => {
    const sortValueA = usa[options.sortBy];
    const sortValueB = usb[options.sortBy];

    if (typeof sortValueA === "string") {
      return sortValueA.localeCompare(sortValueB);
    } else {
      return sortValueB - sortValueA;
    }
  });

  return processedUserStocks;
}

function evalResults(userStocks) {
  const results = {
    totalPrice: 0,
    totalMarketPrice: 0,
    totalEarnings: 0,
    totalPayout: 0,
    totalPayoutRate: 0
  };

  userStocks.forEach((userStock) => {
    results.totalPrice += userStock.totalPrice;
    results.totalMarketPrice += userStock.totalMarketPrice;
    results.totalEarnings += userStock.totalEarnings;
    results.totalPayout += userStock.currentPayout;
  });

  results.totalPayoutRate = results.totalPayout / results.totalPrice;

  return results;
}

function UserStockListHeader({ position, sortKey, label, setSortBy }) {
  const onClick = useCallback(() => {
    if(sortKey && setSortBy) {
      setSortBy(sortKey);
    }
  }, [sortKey, setSortBy])

  return (
    <Text onClick={onClick} style={ tw("text-gray-400 font-bold text-center", tableGrid[position]) }>{label}</Text>
  )
}

export default function UserStockList({ userStocks }) {
  const [processedUserStocks, setProcessedUserStocks] = useState([]);
  const [results, setResults] = useState(null);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [sortBy, setSortBy] = useState("code");

  useEffect(() => {
    const processedUserStocks = processUserStocks(userStocks, { showActiveOnly, sortBy });
    setProcessedUserStocks(processedUserStocks);
    setResults(evalResults(processedUserStocks));
  }, [userStocks, sortBy])

  return (
    <View>
      <MainTitle>All Assets</MainTitle>
      <View style={ tw("px-4 py-2 flex flex-row border-b border-gray-300") }>
        <UserStockListHeader position={0} label="Code" sortKey="code" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockListHeader position={1} label="Count" />
        <UserStockListHeader position={2} label="Price" />
        <UserStockListHeader position={3} label="Market Price" />
        <UserStockListHeader position={4} label="Earnings" sortKey="totalEarnings" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockListHeader position={5} label="Payout" sortKey="currentPayout" setSortBy={setSortBy} sortBy={sortBy} />
        <UserStockListHeader position={6} label="Category" />
      </View>

      {
        processedUserStocks.map((userStock) => {
          return <UserStockListItem key={userStock.id} userStock={userStock} />
        })
      }

      {
        results ?
          <View style={ tw("px-4 py-2 flex flex-row border-t border-b border-gray-300") }>
            <Text style={ tw("text-gray-400 text-lg font-bold text-center", tableGrid[0]) } >TOTAL</Text>
            <Text style={ tw(tableGrid[1]) } />
            <Text style={ tw("text-gray-600 text-lg text-center", tableGrid[2]) }>{ formatMoney(results.totalPrice) }</Text>
            <Text style={ tw("text-gray-600 text-lg text-center", tableGrid[3]) }>{ formatMoney(results.totalMarketPrice) }</Text>
            <Text style={ tw("text-gray-600 text-lg text-center", tableGrid[4]) }>{ formatMoney(results.totalEarnings) }</Text>
            <ColoredAmountAndRate
              amount={results.totalPayout}
              rate={results.totalPayoutRate}
              className={["w-60 text-lg text-center", tableGrid[5]].join(" ")}
            />
            <Text style={ tw("text-gray-400 text-lg font-bold text-center", tableGrid[6]) } />
          </View> : null
      }

      {
        processedUserStocks ? (
          <View>
            <MainTitle> Wallet </MainTitle>
            <UserStockWallet userStocks={processedUserStocks} />
          </View>
        ) : null
      }
    </View>
  );
}
