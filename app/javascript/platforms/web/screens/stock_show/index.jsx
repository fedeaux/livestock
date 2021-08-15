import React, { useCallback, useMemo, useState } from "react";

import Stock from "models/stock";
import MainTitle from "ui/typography/MainTitle";
import SecondaryTitle from "ui/typography/SecondaryTitle";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useApiStock } from "generated/api";

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

function StockKpiListItem({ stockKpi }) {
  return (
    <View style={tw("px-4 py-2")}>
      <Text style={tw("text-gray-600 px-2 w-32 mb-4")}>
        {format(stockKpi.date, "MMM/yyyy")}
      </Text>
      <View style={tw("flex flex-row flex-wrap")}>
        {[
          "bvps",
          "dy",
          "eps",
          "evToEbit",
          "ndToEbit",
          "ndToEv",
          "pToBv",
          "pToE",
          "pToEbit",
          "pToEps",
          "pToEv",
          "price",
          "psr",
          "roa",
          "roe",
          "roic",
        ].map((attribute) => {
          return (
            <View
              key={attribute}
              style={tw("w-2/12 border border-gray-400 rounded p-2 mr-2 mb-2")}
            >
              <Text style={tw("text-gray-600 text-center")}>{attribute}</Text>
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

export default function StockShowIndex() {
  const { id } = useParams();
  const { stock } = useApiStock(id);

  if (!stock) return null;

  return (
    <View style={tw("p-4")}>
      <MainTitle>{stock.code}</MainTitle>
      <View style={tw("flex-row")}>
        <View style={tw("w-3/12 pr-2 border-r border-gray-200")}>
          <SecondaryTitle> Earnings </SecondaryTitle>
          <StockEarningList stockEarnings={stock.stockEarnings} />
        </View>
        <View style={tw("w-3/12 px-2 border-r border-gray-200")}>
          <SecondaryTitle> User Earnings </SecondaryTitle>
        </View>
        <View style={tw("w-6/12 pl-2")}>
          <SecondaryTitle> KPIs </SecondaryTitle>
          <StockKpiList stockKpis={stock.stockKpis} />
        </View>
      </View>
    </View>
  );
}
