import ReactApexChart from "react-apexcharts";
import { useApiStock } from "generated/api";
import { getTime, format, isAfter } from "date-fns";
import formatMoney from "ui/formatters/money";
import formatPercentage from "ui/formatters/percentage";
import { createConsumer } from "@rails/actioncable";

import MainTitle from "ui/typography/MainTitle";
import SecondaryTitle from "ui/typography/SecondaryTitle";
import TableCell from "ui/Table/Cell";
import TableHeader from "ui/Table/Header";
import TableRow from "ui/Table/Row";
import Button from "ui/controls/button";
import useApiStockList from "generated/useApiStockList";
import WatchedStockPrice from "pojos/WatchedStockPrice";

const tableGrid = ["w-1/12", "w-3/12", "w-2/12", "w-2/12", "w-2/12"];

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

function TrendDirectionAndPosition({ slope, position }) {
  if (isNaN(slope)) return null;

  const angle = (Math.atan(slope) * 180) / Math.PI;

  const borderColor = angle >= 0 ? "border-green-400" : "border-red-400";
  const positionColor = position >= 0.5 ? "bg-green-400" : "bg-red-400";

  return (
    <View
      style={tw("w-full relative", {
        transform: [{ rotate: `${-angle}deg` }],
      })}
    >
      <View
        style={tw("border-b w-3/4", borderColor, { marginLeft: "12.5%" })}
      />
      <View
        style={tw("border-b w-3/4 mt-4", borderColor, { marginLeft: "12.5%" })}
      />
      <View
        style={tw("border-b w-3/4 mt-4", borderColor, { marginLeft: "12.5%" })}
      />
      <View
        style={tw("w-2 h-2 rounded absolute", positionColor, {
          bottom: `${position * 100}%`,
          left: "50%",
        })}
      />
    </View>
  );
}

function TrendWatchListItem({ stock, stockTrend, trend, watchedStockPrice }) {
  const fieldsOffset = 2;
  const [showChart, , , toggleShowChat] = useBoolState();
  const twp = showChart ? "bg-gray-200" : "";
  const {
    currentPrice,
    resistancePrice,
    currentPriceTrendPosition,
    supportPrice,
  } = trend;

  return (
    <>
      <TableRow twp={twp}>
        <WatchListItemFields
          stock={stock}
          watchedStockPrice={watchedStockPrice}
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
        <TableCell twp={[tableGrid[fieldsOffset + 1]]}>
          <TrendDirectionAndPosition
            slope={stockTrend.slope * 10}
            position={currentPriceTrendPosition}
          />
        </TableCell>
        <TableCell twp={[tableGrid[fieldsOffset + 2]]}>
          <View style={tw("flex")}>
            <Text style={tw("mr-2 text-xs text-gray-400")}>
              {format(stockTrend.startedAt, "dd/MM/yyyy")}
            </Text>
            <Text style={tw("mr-2 text-xs text-gray-400")}>
              {formatMoney(stockTrend.deviation * 2)}
              {" | "}
              {formatPercentage(stockTrend.deviationRatio())}
            </Text>

            <Button label="Chart" onClick={toggleShowChat} />
          </View>
        </TableCell>
      </TableRow>
      {showChart && (
        <View style={tw(twp)}>
          <StockChart
            stock={stock}
            stockTrend={stockTrend}
            currentPrice={currentPrice}
          />
        </View>
      )}
    </>
  );
}

function WatchListItemFields({ watchedStockPrice }) {
  return (
    <>
      <TableCell twp={tableGrid[0]}>{watchedStockPrice.code}</TableCell>
      <TableCell twp={tableGrid[1]}>
        <View style={tw("flex")}>
          <Text style={tw("text-xs")}>
            max: {formatErrorableMoney(watchedStockPrice.maxPrice)}
          </Text>
          <Text style={tw("text-lg my-2")}>
            {formatErrorableMoney(watchedStockPrice.currentPrice)}
          </Text>
          <Text style={tw("text-xs")}>
            min: {formatErrorableMoney(watchedStockPrice.minPrice)}
          </Text>
        </View>
      </TableCell>
    </>
  );
}

function WatchListItem({ stock, watchedStockPrice, trend }) {
  const code = stock.code;

  if (trend) {
    return (
      <TrendWatchListItem
        code={code}
        stock={stock}
        stockTrend={stock.activeTrend}
        watchedStockPrice={watchedStockPrice}
        trend={trend}
      />
    );
  }

  return (
    <TableRow>
      <WatchListItemFields
        code={code}
        stock={stock}
        watchedStockPrice={watchedStockPrice}
      />
      <TableCell>No Trends</TableCell>
    </TableRow>
  );
}

function evalWatchedStock(stock, watchedAttributes) {
  const watchedStockPrice = new WatchedStockPrice({
    ...watchedAttributes,
    code: stock.code,
  });

  const watchedStockAttributes = {
    stock,
    watchedStockPrice,
  };

  if (stock.activeTrend) {
    const currentPriceTrendPosition = stock.activeTrend.priceTrendPosition(
      watchedStockPrice.currentPrice
    );

    const supportPrice = stock.activeTrend.supportPrice();

    const resistancePrice = stock.activeTrend.resistancePrice();

    watchedStockAttributes.trend = {
      currentPrice: watchedStockPrice.currentPrice,
      currentPriceTrendPosition,
      supportPrice,
      resistancePrice,
    };
  }

  return watchedStockAttributes;
}

function categorizeWatchedStocks(watchedStocks) {
  const categories = {
    brokenOrMissingTrend: {
      title: "Broken or missing trends",
      watchedStocks: [],
      order: 99,
    },
    topOfChannel: {
      title: "Top of channel",
      watchedStocks: [],
      order: 0,
    },
    bottomOfChannel: {
      title: "Bottom of channel",
      watchedStocks: [],
      order: 1,
    },
    keepWatching: {
      title: "Keep Watching",
      watchedStocks: [],
      order: 2,
    },
  };

  const topAndBottomCount = 5;

  let trending = [];

  watchedStocks.forEach((watchedStock) => {
    if (
      !watchedStock.trend ||
      isNaN(watchedStock.trend.currentPriceTrendPosition)
    ) {
      categories.brokenOrMissingTrend.watchedStocks.push(watchedStock);
    } else {
      trending.push(watchedStock);
    }
  });

  trending = trending.sort((wsa, wsb) => {
    return (
      wsa.trend.currentPriceTrendPosition - wsb.trend.currentPriceTrendPosition
    );
  });

  categories.topOfChannel.watchedStocks = trending
    .slice(trending.length - topAndBottomCount, trending.length)
    .reverse();

  categories.bottomOfChannel.watchedStocks = trending.slice(
    0,
    topAndBottomCount
  );

  categories.keepWatching.watchedStocks = trending.slice(
    topAndBottomCount,
    trending.length - topAndBottomCount
  );

  return Object.values(categories).sort((ca, cb) => {
    return ca.order - cb.order;
  });
}

function WatchListCategory({ title, watchedStocks }) {
  return (
    <View style={tw("p-4 w-1/2")}>
      <SecondaryTitle>{title}</SecondaryTitle>
      <TableRow>
        <TableHeader twp={tableGrid[0]}></TableHeader>
        <TableHeader twp={tableGrid[1]}>Current</TableHeader>
        <TableHeader twp={"w-6/12"}>Trend</TableHeader>
      </TableRow>
      {watchedStocks.map((watchedStock) => {
        return (
          <WatchListItem key={watchedStock.stock.code} {...watchedStock} />
        );
      })}
    </View>
  );
}

function WatchList({ watchList }) {
  const { stocks, isLoading } = useApiStockList(Object.keys(watchList), {
    activeTrendPrices: true,
  });

  if (isLoading) {
    return null;
  }

  const watchedStocks = stocks
    .map((stock) => {
      if (watchList[stock.code]) {
        return evalWatchedStock(stock, watchList[stock.code]);
      }
    })
    .filter((watchedStock) => watchedStock);

  const watchedStocksByCategory = categorizeWatchedStocks(watchedStocks);

  return (
    <View style={tw("flex-row flex-wrap")}>
      {watchedStocksByCategory.map((category) => {
        return <WatchListCategory key={category.title} {...category} />;
      })}
    </View>
  );
}

export default function WatchingIndex() {
  const [watchList, setWatchList] = useState({});
  const devWatchList = {
    TAEE11: { currentPrice: "36.66", minPrice: "36.65", maxPrice: "37.19" },
    BRAP3: { currentPrice: "45.76", minPrice: "45.25", maxPrice: "46.53" },
    ROMI3: { currentPrice: "16.33", minPrice: "16.12", maxPrice: "17.1" },
    TRPL4: { currentPrice: "24.32", minPrice: "24.22", maxPrice: "24.81" },
    CPLE6: { currentPrice: "5.92", minPrice: "5.92", maxPrice: "6.07" },
    CSMG3: { currentPrice: "13.61", minPrice: "13.53", maxPrice: "13.82" },
    BBAS3: { currentPrice: "28.5", minPrice: "28.39", maxPrice: "29.17" },
    PETR4: { currentPrice: "27.25", minPrice: "26.97", maxPrice: "29.19" },
    RAPT4: { currentPrice: "10.16", minPrice: "10.07", maxPrice: "10.59" },
    VIVT3: { currentPrice: "45.52", minPrice: "45", maxPrice: "45.78" },
    BBSE3: { currentPrice: "22.09", minPrice: "22.01", maxPrice: "22.48" },
    UNIP6: { currentPrice: "74.67", minPrice: "73.69", maxPrice: "79.73" },
    EVEN3: { currentPrice: "6.22", minPrice: "6.2", maxPrice: "6.58" },
    TIMS3: { currentPrice: "11.22", minPrice: "11.15", maxPrice: "11.33" },
    CMIG4: { currentPrice: "12.88", minPrice: "12.76", maxPrice: "13.12" },
    GOAU4: { currentPrice: "12.51", minPrice: "12.44", maxPrice: "12.84" },
    WIZS3: { currentPrice: "9.65", minPrice: "9.65", maxPrice: "10.19" },
    ENBR3: { currentPrice: "19.6", minPrice: "19.53", maxPrice: "20.07" },
    B3SA3: { currentPrice: "11.91", minPrice: "11.85", maxPrice: "12.31" },
    GRND3: { currentPrice: "8.58", minPrice: "8.54", maxPrice: "8.82" },
  };

  const { subscription } = useNotificationsSubscription({
    received(payload) {
      if (payload.type == "ClearIntegration#prices") {
        setWatchList(payload.data);
      }
    },
  });

  return (
    <View style={tw("p-4")}>
      <WatchList watchList={watchList} />
    </View>
  );
}
