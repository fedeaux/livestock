import { useLayoutEffect } from "react";

export default function WatchingIndex() {
  useLayoutEffect(() => {
    new TradingView.widget({
      width: 980,
      height: 610,
      symbol: "BMFBOVESPA:CPTS11",
      interval: "5",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "br",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "ate-parece",
    });
  });
  /* <div className="tradingview-widget-container"> */
  /*   <div id="tradingview_b63db"></div> */
  /*   <div className="tradingview-widget-copyright"><a href="https:br.tradingview.com/symbols/BMFBOVESPA-CPTS11/" rel="noopener" target="_blank"><span className="blue-text">Gráfico CPTS11</span></a> por TradingView</div> */
  /*   <script type="text/javascript"> */
  /*   </script> */
  /* </div> */

  return (
    <View>
      <div id="ate-parece" />
    </View>
  );
}
