export default {
  modelName: 'StockEarning',
  attributes: {
      category: {
      name: "category",
      type: "string",
      writeable: true,
      default: "dividends",
    },
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      dy: {
      name: "dy",
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
      perStock: {
      name: "perStock",
      type: "decimal",
      writeable: true,
      default: null,
    },
      receivedAt: {
      name: "receivedAt",
      type: "date",
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
  },
  names: {
    singularUnderscore: "stock_earning",
    pluralUnderscore: "stock_earnings",
    singularDash: "stock-earning",
    pluralDash: "stock-earnings",
    singularCamel: "stockEarning",
    pluralCamel: "stockEarnings",
    singularClass: "StockEarning",
    pluralClass: "StockEarnings",
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
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
      },
      attributes: [
        "per_stock",
        "category",
        "received_at",
      ],
    },
  ],
  enums: {
    category: {
      name: "category",
      valueMap: {
        dividends: 0,
        interestOnEquity: 1,
        amortization: 2,
        taxedIncome: 3,
        earning: 4,
      },
      options: {
      },
    },
  },
}
