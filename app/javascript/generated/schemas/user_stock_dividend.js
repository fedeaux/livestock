export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    userStockId: {
      name: "userStockId",
      type: "integer",
      writeable: true,
      default: null,
    },
    total: {
      name: "total",
      type: "decimal",
      writeable: true,
      default: null,
    },
    perStock: {
      name: "perStock",
      type: "decimal",
      writeable: true,
      default: null,
    },
    stockCount: {
      name: "stockCount",
      type: "integer",
      writeable: true,
      default: null,
    },
    receivedAt: {
      name: "receivedAt",
      type: "date",
      writeable: true,
      default: null,
    },
    createdAt: {
      name: "createdAt",
      type: "datetime",
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
    singularUnderscore: "user_stock_dividend",
    pluralUnderscore: "user_stock_dividends",
    singularDash: "user-stock-dividend",
    pluralDash: "user-stock-dividends",
    singularCamel: "userStockDividend",
    pluralCamel: "userStockDividends",
    singularClass: "UserStockDividend",
    pluralClass: "UserStockDividends",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "user_stock",
      ],
    }
  ],
  enums: {
  },
}
