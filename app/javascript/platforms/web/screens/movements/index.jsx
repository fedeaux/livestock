import React, { useCallback, useMemo, useState } from "react";
import MainTitle from "ui/typography/MainTitle";
import SecondaryTitle from "ui/typography/SecondaryTitle";
import UserStockEarning from "models/user_stock_earning";
import UserStockEarningList from "entities/UserStockEarnings/List";
import { format } from "date-fns";
import formatMoney from "ui/formatters/money";
import TableRow from "ui/Table/Row";
import TableCell from "ui/Table/Cell";
import TableHeader from "ui/Table/Header";
import {
  useApiUserStockEarnings,
  useApiUserStockOperations,
} from "generated/api";
import { Chart } from "react-charts";

function evalUserStockEarningsByMonth(userStockEarnings) {
  const earningsByMonth = [];
  let currentMonth = null;
  let currentMonthEarnings = 0;

  userStockEarnings.forEach((userStockEarning) => {
    const userStockEarningMonth = format(userStockEarning.receivedAt, "MMM/yy");

    if (currentMonth != userStockEarningMonth) {
      if (currentMonth) {
        earningsByMonth.push({
          month: currentMonth,
          earnings:
            Math.round((currentMonthEarnings + Number.EPSILON) * 100) / 100,
        });
      }

      currentMonth = userStockEarningMonth;
      currentMonthEarnings = userStockEarning.total;
    } else {
      currentMonthEarnings += userStockEarning.total;
    }
  });

  earningsByMonth.push({
    month: currentMonth,
    earnings: Math.round((currentMonthEarnings + Number.EPSILON) * 100) / 100,
  });

  return earningsByMonth;
}

function evalUserStockEarningsByMonthChart(userStockEarnings) {
  const userStockDataSet = { total: { label: "TOTAL", data: {} } };

  userStockEarnings.forEach((userStockEarning) => {
    const month = format(userStockEarning.receivedAt, "MMM/yy");

    if (!userStockDataSet.total.data[month]) {
      userStockDataSet.total.data[month] = { value: 0, month, perStock: {} };
    }

    userStockDataSet.total.data[month].value += userStockEarning.total;

    if (!userStockDataSet.total.data[month].perStock[userStockEarning.code]) {
      userStockDataSet.total.data[month].perStock[userStockEarning.code] = {
        value: 0,
        code: userStockEarning.code,
      };
    }

    userStockDataSet.total.data[month].perStock[userStockEarning.code].value +=
      userStockEarning.total;
  });

  return Object.values(userStockDataSet).map((entry) => {
    return {
      ...entry,
      data: Object.values(entry.data)
        .reverse()
        .map((datum) => {
          return {
            ...datum,
            perStock: Object.values(datum.perStock).sort((a, b) => {
              return a.value - b.value;
            }),
          };
        }),
    };
  });
}

function EarningsByMonthChart({ userStockEarnings }) {
  const data = useMemo(() => {
    const userStockEarningsByMonthChart =
      evalUserStockEarningsByMonthChart(userStockEarnings);

    return userStockEarningsByMonthChart;
  }, []);

  const axes = useMemo(
    () => [
      {
        primary: true,
        type: "ordinal",
        position: "bottom",
      },
      {
        type: "linear",
        position: "left",
      },
    ],
    []
  );

  return (
    <View style={{ height: 300 }}>
      <Chart
        data={data}
        axes={axes}
        getPrimary={(datum) => {
          return datum.month;
        }}
        getSecondary={(datum) => {
          return datum.value;
        }}
        tooltip={{
          render: (props) => {
            if (!props?.datum?.originalDatum) return null;

            return (
              <View>
                <Text style={tw("flex text-gray-300 text-lg")}>
                  {formatMoney(props.datum.originalDatum.value)}
                </Text>
                {props.datum.originalDatum.perStock.map((stock) => {
                  return (
                    <View key={stock.code} style={tw("flex flex-row")}>
                      <Text style={tw("text-gray-400 text-sm w-20")}>
                        {stock.code}:
                      </Text>
                      <Text style={tw("text-gray-400 text-sm")}>
                        {formatMoney(stock.value)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          },
        }}
      />
    </View>
  );
}

function EarningsIndex() {
  // BD: Todo
  const { userStockEarnings, isLoading } = useApiUserStockEarnings({
    order: ["receivedAt", "DESC"],
  });

  if (isLoading) return null;

  const userStockEarningsByMonth =
    evalUserStockEarningsByMonth(userStockEarnings);

  return (
    <View style={tw("p-4")}>
      <MainTitle>Earnings</MainTitle>
      <EarningsByMonthChart userStockEarnings={userStockEarnings} />
    </View>
  );
}

function OperationsIndex() {
  // BD: Todo
  const { userStockOperations, isLoading } = useApiUserStockOperations({
    order: ["executedAt", "DESC"],
  });

  if (isLoading) return null;

  return (
    <View style={tw("p-4")}>
      <MainTitle>Operations</MainTitle>
      {userStockOperations.map((userStockOperation) => {
        return (
          <View
            key={userStockOperation.id}
            style={tw("px-4 py-2 flex flex-row border-b border-gray-200")}
          >
            <Text style={tw("text-gray-600 font-semibold mr-2")}>
              {userStockOperation.code}
            </Text>
            <Text style={tw("text-gray-600 font-semibold mr-2")}>
              {userStockOperation.nature}
            </Text>
            <Text style={tw("text-gray-600 font-semibold mr-2")}>
              {userStockOperation.stockCount}
            </Text>
            <Text style={tw("text-gray-600 font-semibold mr-2")}>
              {userStockOperation.stockPrice}
            </Text>
            <Text style={tw("text-gray-600 font-semibold mr-2")}>
              {userStockOperation.total}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default function MovementsIndex() {
  return (
    <View>
      <EarningsIndex />
      <OperationsIndex />
    </View>
  );
}

// <View style={tw("flex flex-row")}>
//   <View style={tw("flex-grow pr-2")}>
//     <SecondaryTitle>By Month</SecondaryTitle>
//     <TableRow>
//       <TableHeader twp="w-20">Month</TableHeader>
//       <TableHeader twp="px-2">Total</TableHeader>
//     </TableRow>
//     {userStockEarningsByMonth.map((monthlyEarnings) => {
//       return (
//         <TableRow key={monthlyEarnings.month}>
//           <TableCell twp="w-20">{monthlyEarnings.month}</TableCell>
//           <TableCell twp="px-2">
//             {formatMoney(monthlyEarnings.earnings)}
//           </TableCell>
//         </TableRow>
//       );
//     })}
//   </View>
//   <View style={tw("flex-grow pl-2")}>
//     <SecondaryTitle>All</SecondaryTitle>
//     <UserStockEarningList userStockEarnings={userStockEarnings} />
//   </View>
// </View>
