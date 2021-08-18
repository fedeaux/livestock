import React, { useCallback, useMemo, useState } from "react";

import Stock from "models/stock";
import MainTitle from "ui/typography/MainTitle";
import SecondaryTitle from "ui/typography/SecondaryTitle";
import TertiaryTitle from "ui/typography/TertiaryTitle";

import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useApiUserStock } from "generated/api";
import UserStockEarningList from "entities/UserStockEarnings/List";
import ColoredAmountAndRate from "ui/typography/ColoredAmountAndRate";
import { underscore } from "inflected";

function UserStockOperationList({ userStockOperations }) {
  return (
    <>
      {userStockOperations.map((userStockOperation) => {
        return (
          <View
            key={userStockOperation.id}
            style={tw("px-4 py-2 flex flex-row border-b border-gray-200")}
          >
            <Text style={tw("text-gray-600 px-2")}>
              {format(userStockOperation.executedAt, "y/MM/dd")}
            </Text>
            <Text style={tw("text-gray-600 px-2")}>
              {userStockOperation.nature} {userStockOperation.stockCount} for{" "}
              {formatMoney(userStockOperation.total)} (
              {formatMoney(userStockOperation.stockPrice)})
            </Text>
          </View>
        );
      })}
    </>
  );
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
            <Text style={tw("text-gray-600 px-2 w-32")}>
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

function humanizeStockKpiKey(key) {
  return underscore(key).replace(/_/g, " ").replace(" to ", "/");
}

function StockKpiListItem({ stockKpi }) {
  return (
    <View style={tw("px-4 py-2")}>
      <Text style={tw("text-gray-600 px-2 w-32 mb-4")}>
        {format(stockKpi.date, "MMM/yyyy")}
      </Text>
      <View style={tw("flex-row")}>
        {["evToEbit", "opdy", "pToBv", "pToE"].map((attribute) => {
          return (
            <View
              key={attribute}
              style={tw("w-20 border border-gray-400 rounded p-2 mr-2 mb-2")}
            >
              <Text style={tw("text-gray-600 text-center")}>
                {humanizeStockKpiKey(attribute)}
              </Text>
              <Text style={tw("text-gray-400 text-center text-lg")}>
                {stockKpi[attribute]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function StockKpiList({ stockKpis }) {
  if (stockKpis?.length == 0) return null;

  return stockKpis.map((stockKpi) => {
    return <StockKpiListItem key={stockKpi.id} stockKpi={stockKpi} />;
  });
}

function UserStockAttribute({ label, children }) {
  return (
    <View style={tw("mb-2")}>
      <Text style={tw("text-gray-600 font-semibold text-sm")}>{label}</Text>
      <Text style={tw("text-gray-600")}>{children}</Text>
    </View>
  );
}

function UserStockAttributes({ userStock }) {
  return (
    <View>
      <UserStockAttribute label="Category">
        {userStock.category}
      </UserStockAttribute>
      <UserStockAttribute label="Count">
        {userStock.stockCount}
      </UserStockAttribute>
      <UserStockAttribute label="Earnings">
        {formatMoney(userStock.earnings)}
      </UserStockAttribute>
      <UserStockAttribute label="Result">
        <ColoredAmountAndRate
          amount={userStock.marketResult}
          rate={userStock.marketResultRatio}
        />
      </UserStockAttribute>
      <UserStockAttribute label="Payout">
        <ColoredAmountAndRate
          amount={userStock.payout}
          rate={userStock.payoutRatio}
        />
      </UserStockAttribute>
    </View>
  );
}

function UserStockPane({ userStock }) {
  return (
    <View>
      <SecondaryTitle> User </SecondaryTitle>
      <View style={tw("flex-row")}>
        <View style={tw("pr-4 border-r border-gray-200")}>
          <TertiaryTitle> Position </TertiaryTitle>
          <UserStockAttributes userStock={userStock} />
        </View>
        <View style={tw("px-4 border-r border-gray-200")}>
          <TertiaryTitle> Operations </TertiaryTitle>
          <UserStockOperationList
            userStockOperations={userStock.userStockOperations}
          />
        </View>
        <View style={tw("pl-4 border-r border-gray-200")}>
          <TertiaryTitle> Earnings </TertiaryTitle>
          <UserStockEarningList
            userStockEarnings={userStock.userStockEarnings}
          />
        </View>
      </View>
    </View>
  );
}

function StockPane({ stock }) {
  return (
    <View>
      <SecondaryTitle> General </SecondaryTitle>
      <View style={tw("flex-row")}>
        <View style={tw("pr-4 border-r border-gray-200")}>
          <TertiaryTitle> Earnings </TertiaryTitle>
          <StockEarningList stockEarnings={stock.stockEarnings} />
        </View>
        <View style={tw("pl-4")}>
          <TertiaryTitle> KPIs </TertiaryTitle>
          <StockKpiList stockKpis={stock.stockKpis} />
        </View>
      </View>
    </View>
  );
}

export default function StockShowIndex() {
  const { id } = useParams();

  // BD-TODO: Interpret Includes
  const { userStock } = useApiUserStock(id, {
    includes: {
      stock: {
        includes: {
          stockEarnings: {},
          stockKpis: {},
        },
      },
    },
  });

  if (!userStock) return null;

  return (
    <View style={tw("p-4 container")}>
      <MainTitle>{userStock.code}</MainTitle>
      <UserStockPane userStock={userStock} />
      <StockPane stock={userStock.stock} />
    </View>
  );
}
