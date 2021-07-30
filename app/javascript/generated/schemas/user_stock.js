export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    userId: {
      name: "userId",
      type: "integer",
      writeable: true,
      default: null,
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
    stockCount: {
      name: "stockCount",
      type: "integer",
      writeable: true,
      default: null,
    },
    averagePricePerStock: {
      name: "averagePricePerStock",
      type: "decimal",
      writeable: true,
      default: null,
    },
    totalPrice: {
      name: "totalPrice",
      type: "decimal",
      writeable: true,
      default: null,
    },
    marketPricePerStock: {
      name: "marketPricePerStock",
      type: "decimal",
      writeable: true,
      default: null,
    },
    totalMarketPrice: {
      name: "totalMarketPrice",
      type: "decimal",
      writeable: true,
      default: null,
    },
    totalEarnings: {
      name: "totalEarnings",
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
    category: {
      name: "category",
      type: "string",
      writeable: true,
      default: null,
    },
    isInactive: {
      name: "isInactive",
      type: "string",
      writeable: true,
      default: null,
    },
    isActive: {
      name: "isActive",
      type: "string",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "user_stock",
    pluralUnderscore: "user_stocks",
    singularDash: "user-stock",
    pluralDash: "user-stocks",
    singularCamel: "userStock",
    pluralCamel: "userStocks",
    singularClass: "UserStock",
    pluralClass: "UserStocks",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "user",
      ],
    },
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
