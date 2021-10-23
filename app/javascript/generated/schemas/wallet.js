export default {
  modelName: 'Wallet',
  attributes: {
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
      default: "0.0",
    },
      earningsRatio: {
      name: "earningsRatio",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      key: {
      name: "key",
      type: "string",
      writeable: true,
      default: null,
    },
      marketPrice: {
      name: "marketPrice",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      marketPriceRatio: {
      name: "marketPriceRatio",
      type: "decimal",
      writeable: true,
      default: "0.0",
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
      name: {
      name: "name",
      type: "string",
      writeable: true,
      default: null,
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
      default: "0.0",
    },
      priceRatio: {
      name: "priceRatio",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
      targetPercentage: {
      name: "targetPercentage",
      type: "decimal",
      writeable: true,
      default: "0.0",
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
      userStocks: {
      name: "userStocks",
      type: "has_many",
      writeable: true,
      default: null,
      model: "UserStock",
    },
  },
  names: {
    singularUnderscore: "wallet",
    pluralUnderscore: "wallets",
    singularDash: "wallet",
    pluralDash: "wallets",
    singularCamel: "wallet",
    pluralCamel: "wallets",
    singularClass: "Wallet",
    pluralClass: "Wallets",
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
  ],
  enums: {
  },
}
