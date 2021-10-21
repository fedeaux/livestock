const API_HOST = 'ENV_API_HOST';

class ClearIntegration {
  constructor() {
    if(window.location.hash == '#renda-variavel/swing-trade') {
      this.startPricesWatcher();
    }
  }

  startPricesWatcher() {
    console.log("[Livestock] Starting pricesWatcher...");
    this.lastSeenPrices = {};

    setInterval(() => {
      const priceUpdates = {};

      try {
        $('.frame-holder iframe').contents().find(".AssetList[style=\"display: block;\"] .AssetListItem").each((index, el) => {
          let stockCode = $('input.stock_name.show', el)[0].value;
          let currentPrice = parseFloat($('.cont_list_one .container .value.show', el)[0].textContent.replace(',', '.'));

          if(!this.lastSeenPrices[stockCode] || this.lastSeenPrices[stockCode].price != currentPrice) {
            let stockPriceUpdate = { price: currentPrice, lastPrice: this.lastSeenPrices[stockCode]?.price };
            priceUpdates[stockCode] = stockPriceUpdate;
            this.lastSeenPrices[stockCode] = stockPriceUpdate;
          }
        })

        $.post(`${API_HOST}/integrations/clear/prices`, { priceUpdates });
      } catch {};
    }, 3000);
  }
}

const clearIntegration = new ClearIntegration();
