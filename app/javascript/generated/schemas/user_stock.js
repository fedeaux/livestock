export default {
  modelName: 'UserStock',
  attributes: {
      averagePricePerStock: {
      name: "averagePricePerStock",
      type: "decimal",
      writeable: true,
      default: null,
    },
      category: {
      name: "category",
      type: "string",
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
      earnings: {
      name: "earnings",
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
      isActive: {
      name: "isActive",
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
      marketPrice: {
      name: "marketPrice",
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
      marketResult: {
      name: "marketResult",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      marketResultRatio: {
      name: "marketResultRatio",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      payout: {
      name: "payout",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      payoutRatio: {
      name: "payoutRatio",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      price: {
      name: "price",
      type: "decimal",
      writeable: true,
      default: null,
    },
      statusInvestUrl: {
      name: "statusInvestUrl",
      type: "string",
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
      stockCount: {
      name: "stockCount",
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
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      user: {
      name: "user",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "User",
    },
      userId: {
      name: "userId",
      type: "integer",
      writeable: true,
      default: null,
    },
      userStockEarnings: {
      name: "userStockEarnings",
      type: "has_many",
      writeable: true,
      default: null,
      model: "UserStockEarning",
    },
      userStockOperations: {
      name: "userStockOperations",
      type: "has_many",
      writeable: true,
      default: null,
      model: "UserStockOperation",
    },
      wallet: {
      name: "wallet",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "Wallet",
    },
      walletId: {
      name: "walletId",
      type: "integer",
      writeable: true,
      default: null,
    },
      walletName: {
      name: "walletName",
      type: "string",
      writeable: true,
      default: null,
    },
      walletRatio: {
      name: "walletRatio",
      type: "decimal",
      writeable: true,
      default: "0.0",
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
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "wallet",
      ],
    },
  ],
  enums: {
  },
}
