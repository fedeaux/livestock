import React, { useCallback, useEffect, useMemo, useState } from "react";

import UserStock from "models/user_stock";
import UserStockTable from "entities/UserStocks/Table";
import WalletTable from "entities/Wallets/Table";

import MainTitle from "ui/typography/MainTitle";
import SecondaryTitle from "ui/typography/SecondaryTitle";
import { useApiUserStocks, useApiWallets } from "generated/api";

export default function DashboardIndex() {
  const { userStocks, isLoading: usil } = useApiUserStocks();
  const { wallets, isLoading: wil } = useApiWallets();

  if (usil || wil) return null;

  return (
    <View style={tw("p-4")}>
      <MainTitle>Dashboard</MainTitle>
      <SecondaryTitle>Wallets</SecondaryTitle>
      <WalletTable wallets={wallets} />
      <View style={tw("h-8")} />
      <SecondaryTitle>Assets</SecondaryTitle>
      <UserStockTable userStocks={userStocks} />
    </View>
  );
}
