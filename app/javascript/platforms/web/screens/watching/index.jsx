import { useLayoutEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useApiStock } from "generated/api";
import { getTime } from "date-fns";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import { createConsumer } from "@rails/actioncable";

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

    const a = 0.006492282633448045;
    const b = -115.86498334703106;
    const cost = 0.4;

    const trendPoints = props.stock.stockPrices.map((stockPrice) => {
      const x = getTime(stockPrice.day) / (1000 * 60 * 60 * 24);
      const y = x * a + b;

      return {
        x: stockPrice.day,
        y: round(y),
      };
    });

    const resistencePoints = trendPoints.map((point) => {
      return {
        x: point.x,
        y: round(point.y + cost),
      };
    });

    const supportPoints = trendPoints.map((point) => {
      return {
        x: point.x,
        y: round(point.y - cost),
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
          data: props.stock.stockPrices.map((stockPrice) => {
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
          name: "resistence",
          data: resistencePoints,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
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
        <h1>{this.props.stock.code}</h1>
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
      {watchList.map(({ code, ...properties }) => {
        return (
          <View key={code} style={tw("flex-row")}>
            <View style={tw("w-4/12")} />
            <Text style={tw("mr-2 w-1/12")}>{code}</Text>
            <Text style={tw("mr-2 w-1/12")}>
              {formatErrorableMoney(properties.currentPrice)}
            </Text>
            <Text style={tw("mr-2 w-1/12")}>
              {formatErrorableMoney(properties.minPrice)}
            </Text>
            <Text style={tw("mr-2 w-1/12")}>
              {formatErrorableMoney(properties.maxPrice)}
            </Text>
          </View>
        );
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
