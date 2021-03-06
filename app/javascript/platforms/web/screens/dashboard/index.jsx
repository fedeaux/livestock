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
import Icon5 from "react-native-vector-icons/FontAwesome5";

const tableGrid = ["w-3/12", "w-3/12", "w-3/12", "w-3/12", "w-3/12", "w-3/12"];

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

    const trendPoints = stockTrend.stockPrices.map((stockPrice) => {
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
          data: stockTrend.stockPrices.map((stockPrice) => {
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
  const [showChart, , , toggleShowChart] = useBoolState();
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

            <Button label="Chart" onClick={toggleShowChart} />
          </View>
        </TableCell>
        <TableCell twp={[tableGrid[fieldsOffset + 3]]}>
          <View style={tw("flex")}>
            <Text style={tw("mr-2 text-xs text-gray-400")}>Alert</Text>
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

function WatchListItemFields({ stock, watchedStockPrice }) {
  const userStock = stock.userStock;

  return (
    <>
      <TableCell twp={tableGrid[0]}>
        <Text style={tw("text-lg text-gray-700")}>
          {watchedStockPrice.code}
        </Text>
      </TableCell>
      <TableCell twp={tableGrid[0]}>
        {userStock && (
          <View style={tw("mt-2")}>
            <Text style={tw("text-xs text-gray-300")}>
              {userStock.walletName}
            </Text>
            <View style={tw("mt-2")}>
              {userStock.stockCount > 0 ? (
                <>
                  <Text style={tw("text-gray-500 text-xs")}>
                    {formatErrorableMoney(userStock.marketPrice)}
                  </Text>
                  <Text style={tw("text-gray-500 text-xs")}>
                    {formatPercentage(userStock.walletRatio)}
                  </Text>
                  <Text style={tw("text-gray-500 text-xs")}>
                    {userStock.stockCount}
                  </Text>
                </>
              ) : (
                <Text style={tw("text-gray-500 text-xs")}>
                  {formatPercentage(0)}
                </Text>
              )}
            </View>
          </View>
        )}
      </TableCell>
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

import Dividends from "data/projected_dividends.json";

function evalWatchedStock(stock, watchedAttributes) {
  const extraAttributes = {};

  const stockDividends = Dividends.find((dividend) => {
    return dividend.stock_code == stock.code;
  });

  if (stockDividends) {
    extraAttributes.projectedDividendsPerShare = stockDividends.dpa;
  }

  const watchedStockPrice = new WatchedStockPrice({
    ...watchedAttributes,
    ...extraAttributes,
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

  const topAndBottomCount = 6;

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

function DyWatchListItemFields({ code, stock, watchedStockPrice }) {
  return (
    <TableCell twp={tableGrid[1]}>
      <View style={tw("flex")}>
        <Text style={tw("text-xs")}>
          {formatErrorableMoney(watchedStockPrice.lowerDyPrice)}
          {" - "}
          {formatPercentage(watchedStockPrice.lowerDy)}
        </Text>
        <Text style={tw("text-lg my-2")}>
          {formatPercentage(watchedStockPrice.dyAtPrice)}
        </Text>
        <Text style={tw("text-xs")}>
          {formatErrorableMoney(watchedStockPrice.upperDyPrice)}
          {" - "}
          {formatPercentage(watchedStockPrice.upperDy)}
        </Text>
      </View>
    </TableCell>
  );
}

function DyWatchList({ watchedStocks }) {
  const sortedWatchedStocks = watchedStocks
    .filter((watchedStock) => {
      return watchedStock.watchedStockPrice.projectedDividendsPerShare > 0;
    })
    .sort((wsa, wsb) => {
      return wsb.watchedStockPrice.dyAtPrice - wsa.watchedStockPrice.dyAtPrice;
    });

  return (
    <>
      {sortedWatchedStocks.map((watchedStock) => {
        return (
          <TableRow key={watchedStock.watchedStockPrice.code}>
            <WatchListItemFields
              code={watchedStock.watchedStockPrice.code}
              stock={watchedStock.stock}
              watchedStockPrice={watchedStock.watchedStockPrice}
            />
            <DyWatchListItemFields
              code={watchedStock.watchedStockPrice.code}
              stock={watchedStock.stock}
              watchedStockPrice={watchedStock.watchedStockPrice}
            />
          </TableRow>
        );
      })}
    </>
  );
}

function WatchList({ watchList }) {
  const { stocks, isLoading } = useApiStockList(Object.keys(watchList), {
    includes: {
      activeTrend: {
        includes: {
          stockPrices: {},
        },
      },
      currentUserStock: {},
    },
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

  return (
    <View style={tw("p-4 w-1/2")}>
      <DyWatchList watchedStocks={watchedStocks} />
    </View>
  );
}

export default function DashboardIndex() {
  const [watchList, setWatchList] = useState({});
  const devWatchList = {
    TAEE11: { currentPrice: "36.66", minPrice: "36.65", maxPrice: "37.19" },
    BRAP3: { currentPrice: "45.76", minPrice: "45.25", maxPrice: "46.53" },
    TRPL4: { currentPrice: "24.32", minPrice: "24.22", maxPrice: "24.81" },
    CPLE6: { currentPrice: "5.92", minPrice: "5.92", maxPrice: "6.07" },
    CSMG3: { currentPrice: "13.61", minPrice: "13.53", maxPrice: "13.82" },
    BBAS3: { currentPrice: "28.5", minPrice: "28.39", maxPrice: "29.17" },
    PETR4: { currentPrice: "27.25", minPrice: "26.97", maxPrice: "29.19" },
    VIVT3: { currentPrice: "45.52", minPrice: "45", maxPrice: "45.78" },
    B3SA3: { currentPrice: "11.91", minPrice: "11.85", maxPrice: "12.31" },
    GRND3: { currentPrice: "8.58", minPrice: "8.54", maxPrice: "8.82" },
    VBBR3: { currentPrice: "20.98", minPrice: "20.83", maxPrice: "21.82" },
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
