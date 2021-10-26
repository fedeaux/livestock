import { useLayoutEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useApiStock } from "generated/api";
import { getTime } from "date-fns";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          type: "candlestick",
          name: "prices",
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
          name: "trend",
          data: props.stock.stockPrices.map((stockPrice) => {
            const y =
              (getTime(stockPrice.day) - 1621825200000) /
                (100000 * 60 * 60 * 24) +
              6;

            return {
              x: stockPrice.day,
              y: Math.round((y + Number.EPSILON) * 100) / 100,
            };
          }),
        },
      ],
      options: {
        chart: {
          height: 350,
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <h1>{this.props.stock.code}</h1>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          height={350}
        />
      </div>
    );
  }
}

export default function WatchingIndex() {
  const { stock, isLoading } = useApiStock(29);

  if (isLoading) return null;

  return (
    <View>
      <ApexChart stock={stock} />
    </View>
  );
}
