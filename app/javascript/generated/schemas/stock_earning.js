export default {
  attributes: {
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
    dy: {
      name: "dy",
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
    category: {
      name: "category",
      type: "integer",
      writeable: true,
      default: "0",
    },
    stockId: {
      name: "stockId",
      type: "integer",
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
  ],
  enums: {
  },
}
