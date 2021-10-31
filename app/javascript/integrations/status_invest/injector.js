const API_HOST = 'ENV_API_HOST';

class StatusInvestIntegration {
  constructor() {
    if(window.location.pathname.endsWith('/carteira/transacao')) {
      this.addSyncOperationsButton();
    }

    if(window.location.pathname.endsWith('/acoes/busca-avancada')) {
      this.addSyncMarketBrlStocksButton();
    }

    if(window.location.pathname.endsWith('/fundos-imobiliarios/busca-avancada')) {
      this.addSyncRealEstateBrlStocksButton();
    }
  }

  addSyncOperationsButton() {
    this.doTheButtonThing('Sync Operations', () => {
      const operations = [];

      $('tr', $('table tbody')[1]).each((index, tr) => {
        const cols = $('td', tr);

        const nature = {
          Com: 'buy',
          Ven: 'sell',
          Bon: 'bonus'
        }[cols.eq(2).text().replace(/\s+/g, '').slice(0, 3)]

        const operation = {
          code: $('.ticker', cols.eq(1)).text().replace(/\s+/g, '').replace(/F$/, ''),
          nature,
          executed_at: cols.eq(4).text(),
          stock_count: parseInt(cols.eq(6).text().replace(/\s+/g, '').replace('.', '').replace(',', '.')),
          stock_price: parseFloat(cols.eq(7).text().replace(/\s+/g, '').replace('.', '').replace(',', '.')),
        };

        operations.push(operation);
      })

      $.post(`${API_HOST}/integrations/status_invest/operations`, { operations });
    })
  }

  addSyncMarketBrlStocksButton() {
    this.doTheButtonThing('Sync Market Brl Stocks Button', () => {
      const stocks = [];

      $('tr', $('table tbody')[1]).each((index, tr) => {
        const cols = $('td', tr);

        const stock = {
          code: $('.ticker', cols.eq(0)).text().replace(/\s+/g, '').replace(/F$/, ''),
          category: 'market',
          currency: 'brl'
        };

        stocks.push(stock);
      })

      $.post(`${API_HOST}/integrations/status_invest/stocks`, { stocks });
    })
  }

  addSyncRealEstateBrlStocksButton() {
    this.doTheButtonThing('Sync Real Estate Brl Stocks Button', () => {
      const stocks = [];

      $('tr', $('table tbody')[1]).each((index, tr) => {
        const cols = $('td', tr);

        const stock = {
          code: $('.ticker', cols.eq(0)).text().replace(/\s+/g, '').replace(/F$/, ''),
          category: 'real_estate',
          currency: 'brl'
        };

        stocks.push(stock);
      })

      $.post(`${API_HOST}/integrations/status_invest/stocks`, { stocks });
    })
  }

  doTheButtonThing(label, callback) {
    const button = $(`
      <div style="position: fixed; bottom: 10px; right: 10px; z-index: 1902834;">
        <button> ${label} </button>
      </div>
    `);

    button.on('click', callback);

    $('body').append(button);
  }
}

window.LSStatusInvestIntegration = new StatusInvestIntegration();
