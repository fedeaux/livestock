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
  "w-4/24",
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

    const currentPricePoints = trendPoints.map((point) => {
      return {
        x: point.x,
        y: props.currentPrice,
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
        {
          type: "line",
          name: "currentPrice",
          data: currentPricePoints,
        },
      ],
      options: {
        animations: {
          enabled: false,
        },
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          curve: "straight",
          width: [1, 1],
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
  const fieldsOffset = 2;
  const [showChart, , , toggleShowChat] = useBoolState();
  const twp = showChart ? "bg-gray-200" : "";

  return (
    <>
      <TableRow twp={twp}>
        <WatchListItemFields
          stock={stock}
          currentPrice={currentPrice}
          {...props}
        />
        <TableCell twp={tableGrid[fieldsOffset]}>
          <View style={tw("flex")}>
            <Text style={tw("text-xs")}>{formatMoney(resistancePrice)}</Text>
            <Text style={tw("text-lg my-2")}>
              {formatPercentage(currentPriceTrendPosition)}
            </Text>
            <Text style={tw("text-xs")}>{formatMoney(supportPrice)}</Text>
          </View>
        </TableCell>
        <TableCell twp={tableGrid[fieldsOffset + 1]}>
          <Button label="Chart" onClick={toggleShowChat} />
        </TableCell>
      </TableRow>
      {showChart && (
        <View style={tw(twp)}>
          <StockChart
            stock={stock}
            stockTrend={stockTrend}
            currentPrice={numberCurrentPrice}
          />
        </View>
      )}
    </>
  );
}

function WatchListItemFields({ code, currentPrice, minPrice, maxPrice }) {
  return (
    <>
      <TableCell twp={tableGrid[0]}>{code}</TableCell>
      <TableCell twp={tableGrid[1]}>
        <View style={tw("flex")}>
          <Text style={tw("text-xs")}>
            max: {formatErrorableMoney(maxPrice)}
          </Text>
          <Text style={tw("text-lg my-2")}>
            {formatErrorableMoney(currentPrice)}
          </Text>
          <Text style={tw("text-xs")}>
            min: {formatErrorableMoney(minPrice)}
          </Text>
        </View>
      </TableCell>
    </>
  );
}

function WatchListItem({ code, ...props }) {
  const { stock, isLoading, error } = useApiStock(code, {
    activeTrendPrices: true,
  });

  if (isLoading || error) return null;

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
      <TableCell>No Trends</TableCell>
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
        <TableHeader twp={tableGrid[1]}>Current</TableHeader>
        <TableHeader twp={tableGrid[2]}>Trend</TableHeader>
        <TableHeader twp={tableGrid[3]}></TableHeader>
      </TableRow>
      {watchList.map(({ code, ...properties }) => {
        return <WatchListItem key={code} code={code} {...properties} />;
      })}
    </View>
  );
}

export default function WatchingIndex() {
  return <WatchList />;
}
