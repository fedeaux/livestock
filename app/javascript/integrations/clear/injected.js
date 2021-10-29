const API_HOST = 'ENV_API_HOST';

class ClearIntegration {
  constructor() {
    console.log("window.location.hash", window.location.hash);

    if(window.location.hash == '#renda-variavel/swing-trade') {
      this.startPricesWatcher();
    }

    if(window.location.hash == '#minha-conta/historico-ordens') {
      this.addSyncOperationsButton();
    }
  }

  addSyncOperationsButton() {
    const button = $(`
      <div style="position: absolute; bottom: 10px; right: 10px; z-index: 1902834;">
        <button> Sync Operations </button>
      </div>
    `);

    button.on('click', () => {
      const operations = [];
      console.log("this", this);

      this.iframeContents().find('.Filled.order-item').each((index, el) => {
        const date = $('.date-info .date', el)[0].textContent;
        const time = $('.date-info .hour', el)[0].textContent;
        const code = $('.symbol-info .name .symbol', el)[0].textContent;
        const count = $('.quantity-info', el)[0].textContent;
        const price = $('.price-info', el)[0].textContent;
        const nature = $('.type-info', el)[0].className.includes('buy') ? 'buy' : 'sell';
        operations.push({ date, time, code, count, price, nature });
      });

      console.log(operations);
      $.post(`${API_HOST}/integrations/clear/operations`, { operations });
    });

    $('body').append(button);
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
