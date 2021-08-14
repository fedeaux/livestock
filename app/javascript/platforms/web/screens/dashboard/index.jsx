import React, { useCallback, useEffect, useMemo, useState } from "react";

import UserStock from "models/user_stock";
import UserStockTable from "entities/UserStocks/Table";
import MainTitle from "ui/typography/MainTitle";
import { useApiUserStocks } from "generated/api";

export default function DashboardIndex() {
  const { userStocks, isLoading } = useApiUserStocks();

  if (isLoading) return null;

  return (
    <View style={tw("p-4")}>
      <MainTitle>Dashboard</MainTitle>
      <UserStockTable userStocks={userStocks} />
    </View>
  );
}
