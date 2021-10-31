const API_HOST = 'ENV_API_HOST';

class ClearIntegration {
  constructor() {
    console.log("window.location.hash", window.location.hash);

    if(window.location.hash == '#renda-variavel/swing-trade') {
      this.startPricesWatcher();
    }
  }

  iframeContents() {
    return $('.frame-holder iframe').contents();
  }

  startPricesWatcher() {
    console.log("[LS] Starting pricesWatcher...");
    this.lastSeenPrices = {};

    const tryToGetPrice = (selector, element) => {
      const selected = $(selector, element);

      if(selected[0]) {
        return parseFloat(selected[0].textContent.replace(',', '.'));
      }
    }

    const pricesWatcherInterval = setInterval(() => {
      const priceUpdates = {};

      if(window.location.hash != '#renda-variavel/swing-trade') {
        return clearInterval(pricesWatcherInterval);
      }

      $(".AssetList .AssetListItem .cont_list_one .container .value.show")

      try {
        this.iframeContents().find(".AssetList .AssetListItem").each((index, el) => {
          try {
            let stockCode = $('input.stock_name.show', el)[0].value;

            if(stockCode.length < 1) return;

            let currentPrice = tryToGetPrice('.cont_list_one .container .value.show', el);
            let minPrice = tryToGetPrice('.cont_list_two .lowest-price', el);
            let maxPrice = tryToGetPrice('.cont_list_two .highest-price', el);

            let stockPriceUpdate = {
              currentPrice,
              minPrice,
              maxPrice
            };

            priceUpdates[stockCode] = stockPriceUpdate;
          } catch (e) {
            console.log("[LS] Error in item:", e);
          }
        })

        if(Object.keys(priceUpdates).length > 0) {
          console.log("[LS] Ping")
          $.post(`${API_HOST}/integrations/clear/prices`, { priceUpdates });
        } else {
          console.log("[LS] I'm here but nothing is changing")
        }
      } catch(error) {
        console.error(error);
      };
    }, 2000);
  }
}

window.LSClearIntegration = new ClearIntegration();
