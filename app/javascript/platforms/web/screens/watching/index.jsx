import { useLayoutEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useApiStock } from "generated/api";
import { getTime, isAfter } from "date-fns";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import { createConsumer } from "@rails/actioncable";

import TableCell from "ui/Table/Cell";
import TableHeader from "ui/Table/Header";
import TableRow from "ui/Table/Row";
import Button from "ui/controls/button";

const tableGrid = [
  "w-2/24",
  "w-2/24",
  "w-2/24",
  "w-2/24",
  "w-2/24",
  "w-2/24",
  "w-2/24",
  "w-2/24",
  "w-2/24",
];

function round(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function getConsumerUrl() {
  let protocol = "wss:";

  if (location.protocol == "http:") {
    protocol = "ws:";
  }

  return `${protocol}//${location.host}/cable`;
}

const consumer = createConsumer(getConsumerUrl());

function useNotificationsSubscription(options) {
  const subscriptionName = "NotificationsChannel";
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const newSubscription = consumer.subscriptions.create(subscriptionName, {
      ...options,
    });

    setSubscription(newSubscription);

    return () => {
      if (newSubscription) {
        consumer.subscriptions.remove(newSubscription);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionName]);

  return { subscription };
}

class StockChart extends React.Component {
  constructor(props) {
    super(props);

    const stock = props.stock;
    const stockTrend = props.stockTrend;
    const deviation = stockTrend.deviation;

    // console.log("stockTrend", stockTrend);
    // console.log("deviation", deviation);

    const trendPrices = props.stock.stockPrices.filter((stockPrice) => {
      return isAfter(stockPrice.day, stockTrend.startedAt);
    });

    const trendPoints = trendPrices.map((stockPrice) => {
      const x = stockTrend.dayToX(stockPrice.day);
      const y = stockTrend.priceAt(stockPrice.day);

      return {
        x: stockPrice.day,
        y: round(y),
      };
    });

    const resistancePoints = trendPoints.map((point) => {
      return {
        x: point.x,
        y: round(point.y + deviation),
      };
    });

    const supportPoints = trendPoints.map((point) => {
      return {
        x: point.x,
        y: round(point.y - deviation),
      };
    });

    this.state = {
      series: [
        {
          type: "line",
          name: "trend",
          data: trendPoints,
        },
        {
          name: "prices",
          type: "candlestick",
          data: trendPrices.map((stockPrice) => {
            return {
              x: stockPrice.day,
              y: [
                stockPrice.open,
                stockPrice.low,
                stockPrice.high,
                stockPrice.close,
              ],
            };
          }),
        },
        {
          type: "line",
          name: "support",
          data: supportPoints,
        },
        {
          type: "line",
          name: "resistance",
          data: resistancePoints,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [1, 1],
          curve: "straight",
        },
        xaxis: {
          type: "datetime",
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart {...this.state} height={350} />
      </div>
    );
  }
}

function formatErrorableMoney(price) {
  if (price) {
    return formatMoney(parseFloat(price));
  } else {
    return "error";
  }
}

function TrendWatchListItem({ currentPrice, stock, stockTrend, ...props }) {
  const numberCurrentPrice = parseFloat(currentPrice); // ouch!!!!!
  const currentPriceTrendPosition = stockTrend.priceTrendPosition(currentPrice);
  const supportPrice = stockTrend.supportPrice();
  const resistancePrice = stockTrend.resistancePrice();
  const fieldsOffset = 4;
  const [showChart, , , toggleShowChat] = useBoolState();

  return (
    <>
      <TableRow>
        <WatchListItemFields
          stock={stock}
          currentPrice={currentPrice}
          {...props}
        />
        <TableCell twp={tableGrid[fieldsOffset]}>
          {formatMoney(supportPrice)}
        </TableCell>
        <TableCell twp={tableGrid[fieldsOffset + 1]}>
          {formatPercentage(currentPriceTrendPosition)}
        </TableCell>
        <TableCell twp={tableGrid[fieldsOffset + 2]}>
          {formatMoney(resistancePrice)}
        </TableCell>
        <TableCell twp={tableGrid[fieldsOffset + 3]}>
          <Button label="Chart" onClick={toggleShowChat} />
        </TableCell>
      </TableRow>
      {showChart && <StockChart stock={stock} stockTrend={stockTrend} />}
    </>
  );
}

function WatchListItemFields({ code, currentPrice, minPrice, maxPrice }) {
  return (
    <>
      <TableCell twp={tableGrid[0]}>{code}</TableCell>
      <TableCell twp={tableGrid[1]}>
        {formatErrorableMoney(currentPrice)}
      </TableCell>
      <TableCell twp={tableGrid[2]}>{formatErrorableMoney(minPrice)}</TableCell>
      <TableCell twp={tableGrid[3]}>{formatErrorableMoney(maxPrice)}</TableCell>
    </>
  );
}

function WatchListItem({ code, ...props }) {
  const { stock, isLoading } = useApiStock(code, {
    activeTrendPrices: true,
  });

  if (isLoading) {
    return null;
  }

  if (stock.activeTrend) {
    return (
      <TrendWatchListItem
        code={code}
        stock={stock}
        stockTrend={stock.activeTrend}
        {...props}
      />
    );
  }

  return (
    <TableRow>
      <WatchListItemFields code={code} stock={stock} {...props} />
      <TableCell style={tw("mr-2 w-1/12")}>No Trends</TableCell>
    </TableRow>
  );
}

function WatchList() {
  const [watchList, setWatchList] = useState([]);

  const { subscription } = useNotificationsSubscription({
    received(payload) {
      if (payload.type == "ClearIntegration#prices") {
        const sortedStocks = Object.entries(payload.data)
          .map(([code, properties]) => {
            return { ...properties, code };
          })
          .sort((sa, sb) => {
            return sa.code.localeCompare(sb.code);
          });

        setWatchList(sortedStocks);
      }
    },
  });

  return (
    <View style={tw("px-2")}>
      <TableRow>
        <TableHeader twp={tableGrid[0]}></TableHeader>
        <TableHeader twp={tableGrid[1]}>Min</TableHeader>
        <TableHeader twp={tableGrid[2]}>Max</TableHeader>
        <TableHeader twp={tableGrid[3]}>Current</TableHeader>
        <TableHeader twp={tableGrid[4]}>Support</TableHeader>
        <TableHeader twp={tableGrid[5]}>Position</TableHeader>
        <TableHeader twp={tableGrid[6]}>Resistance</TableHeader>
      </TableRow>
      {watchList.map(({ code, ...properties }) => {
        return <WatchListItem key={code} code={code} {...properties} />;
      })}
    </View>
  );
}

export default function WatchingIndex() {
  // const { stock, isLoading } = useApiStock(29);

  return (
    <View>
      <WatchList />
      {/* {!isLoading && <StockChart isLoading={isLoading} stock={stock} />} */}
    </View>
  );
}
