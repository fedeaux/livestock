import { useLayoutEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useApiStock } from "generated/api";
import { getTime } from "date-fns";

function round(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
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

export default function WatchingIndex() {
  const { stock, isLoading } = useApiStock(29);

  return (
    <View>
      {!isLoading && <StockChart isLoading={isLoading} stock={stock} />}
    </View>
  );
}
