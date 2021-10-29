export default {
  modelName: 'StockTrend',
  attributes: {
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      deviation: {
      name: "deviation",
      type: "decimal",
      writeable: true,
      default: null,
    },
      finishedAt: {
      name: "finishedAt",
      type: "date",
      writeable: true,
      default: null,
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      intercept: {
      name: "intercept",
      type: "decimal",
      writeable: true,
      default: null,
    },
      slope: {
      name: "slope",
      type: "decimal",
      writeable: true,
      default: null,
    },
      startedAt: {
      name: "startedAt",
      type: "date",
      writeable: true,
      default: null,
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
  },
  names: {
    singularUnderscore: "stock_trend",
    pluralUnderscore: "stock_trends",
    singularDash: "stock-trend",
    pluralDash: "stock-trends",
    singularCamel: "stockTrend",
    pluralCamel: "stockTrends",
    singularClass: "StockTrend",
    pluralClass: "StockTrends",
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
