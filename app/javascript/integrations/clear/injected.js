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
    console.log("TO DENTRO");
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

    const pricesWatcherInterval = setInterval(() => {
      const priceUpdates = {};

      if(window.location.hash != '#renda-variavel/swing-trade') {
        return clearInterval(pricesWatcherInterval);
      }

      try {
        this.iframeContents().find(".AssetList[style=\"display: block;\"] .AssetListItem").each((index, el) => {
          let stockCode = $('input.stock_name.show', el)[0].value;
          let currentPrice = parseFloat($('.cont_list_one .container .value.show', el)[0].textContent.replace(',', '.'));

          if(!this.lastSeenPrices[stockCode] || this.lastSeenPrices[stockCode].price != currentPrice) {
            let stockPriceUpdate = {
              price: currentPrice,
              lastPrice: this.lastSeenPrices[stockCode]?.price
            };
            priceUpdates[stockCode] = stockPriceUpdate;
            this.lastSeenPrices[stockCode] = stockPriceUpdate;
          }
        })

        if(Object.keys(priceUpdates).length > 0) {
          $.post(`${API_HOST}/integrations/clear/prices`, { priceUpdates });
        } else {
          console.log("[LS] I'm here but nothing is changing")
        }
      } catch(error) {
        console.error(error);
      };
    }, 3000);
  }
}

window.LSClearIntegration = new ClearIntegration();
