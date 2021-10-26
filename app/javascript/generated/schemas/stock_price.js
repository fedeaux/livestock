export default {
  modelName: 'StockPrice',
  attributes: {
      close: {
      name: "close",
      type: "decimal",
      writeable: true,
      default: null,
    },
      code: {
      name: "code",
      type: "string",
      writeable: true,
      default: null,
    },
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      day: {
      name: "day",
      type: "date",
      writeable: true,
      default: null,
    },
      high: {
      name: "high",
      type: "decimal",
      writeable: true,
      default: null,
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      low: {
      name: "low",
      type: "decimal",
      writeable: true,
      default: null,
    },
      open: {
      name: "open",
      type: "decimal",
      writeable: true,
      default: null,
    },
      stock: {
      name: "stock",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "Stock",
    },
      stockId: {
      name: "stockId",
      type: "integer",
      writeable: true,
      default: null,
    },
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      volume: {
      name: "volume",
      type: "integer",
      writeable: true,
      default: 0,
    },
  },
  names: {
    singularUnderscore: "stock_price",
    pluralUnderscore: "stock_prices",
    singularDash: "stock-price",
    pluralDash: "stock-prices",
    singularCamel: "stockPrice",
    pluralCamel: "stockPrices",
    singularClass: "StockPrice",
    pluralClass: "StockPrices",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "stock",
      ],
    },
  ],
  enums: {
  },
}
