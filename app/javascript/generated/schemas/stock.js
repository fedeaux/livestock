export default {
  modelName: 'Stock',
  attributes: {
      activeTrend: {
      name: "activeTrend",
      type: "has_one",
      writeable: true,
      default: null,
      model: "StockTrend",
    },
      category: {
      name: "category",
      type: "string",
      writeable: true,
      default: "market",
    },
      code: {
      name: "code",
      type: "string",
      writeable: true,
      default: null,
    },
      currency: {
      name: "currency",
      type: "string",
      writeable: true,
      default: "brl",
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      link: {
      name: "link",
      type: "string",
      writeable: true,
      default: null,
    },
      name: {
      name: "name",
      type: "string",
      writeable: true,
      default: null,
    },
      sector: {
      name: "sector",
      type: "string",
      writeable: true,
      default: null,
    },
      segment: {
      name: "segment",
      type: "string",
      writeable: true,
      default: null,
    },
      stockEarnings: {
      name: "stockEarnings",
      type: "has_many",
      writeable: true,
      default: null,
      model: "StockEarning",
    },
      stockKpis: {
      name: "stockKpis",
      type: "has_many",
      writeable: true,
      default: null,
      model: "StockKpi",
    },
      stockPrices: {
      name: "stockPrices",
      type: "has_many",
      writeable: true,
      default: null,
      model: "StockPrice",
    },
      stockTrends: {
      name: "stockTrends",
      type: "has_many",
      writeable: true,
      default: null,
      model: "StockTrend",
    },
      subsector: {
      name: "subsector",
      type: "string",
      writeable: true,
      default: null,
    },
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      userStock: {
      name: "userStock",
      type: "has_one",
      writeable: true,
      default: null,
      model: "UserStock",
    },
      userStocks: {
      name: "userStocks",
      type: "has_many",
      writeable: true,
      default: null,
      model: "UserStock",
    },
  },
  names: {
    singularUnderscore: "stock",
    pluralUnderscore: "stocks",
    singularDash: "stock",
    pluralDash: "stocks",
    singularCamel: "stock",
    pluralCamel: "stocks",
    singularClass: "Stock",
    pluralClass: "Stocks",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "Please provide a code",
      },
      attributes: [
        "code",
      ],
    },
  ],
  enums: {
    category: {
      name: "category",
      valueMap: {
        market: 0,
        realEstate: 1,
      },
      options: {
      },
    },
    currency: {
      name: "currency",
      valueMap: {
        brl: 0,
        usd: 1,
      },
      options: {
      },
    },
  },
}
