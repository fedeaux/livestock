import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import UserStock from "models/user_stock";
import UserStockList from "entities/UserStocks/List";

async function apiUserStocksIndex() {
  return fetch("api/user_stocks.json").then((response) => {
    return response.json()
  }).then((data) => {
    const instances = data.userStocks.map((attributes) => {
      return new UserStock(attributes);
    })

    return { ...data, userStocks: instances };
  })
}

function useUserStocksIndex() {
  const [userStocks, setUserStocks] = useState([]);

  useEffect(async () => {
    const response = await apiUserStocksIndex();
    setUserStocks(response.userStocks);
  }, []);

  return { userStocks };
}

function useDashboardData() {
  const userStocksIndexData = useUserStocksIndex();

  return userStocksIndexData;
}

export default function DashboardIndex() {
  const { userStocks } = useDashboardData();

  return (
    <View style={ tw("p-4") }>
      <UserStockList userStocks={userStocks} />
    </View>
  );
}
