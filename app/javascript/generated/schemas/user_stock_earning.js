export default {
  modelName: 'UserStockEarning',
  attributes: {
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
      stockCount: {
      name: "stockCount",
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
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      userStock: {
      name: "userStock",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "UserStock",
    },
      userStockId: {
      name: "userStockId",
      type: "integer",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "user_stock_earning",
    pluralUnderscore: "user_stock_earnings",
    singularDash: "user-stock-earning",
    pluralDash: "user-stock-earnings",
    singularCamel: "userStockEarning",
    pluralCamel: "userStockEarnings",
    singularClass: "UserStockEarning",
    pluralClass: "UserStockEarnings",
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
    },
  ],
  enums: {
  },
}
