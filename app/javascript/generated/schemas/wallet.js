export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    name: {
      name: "name",
      type: "string",
      writeable: true,
      default: null,
    },
    userId: {
      name: "userId",
      type: "integer",
      writeable: true,
      default: null,
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
    targetPercentage: {
      name: "targetPercentage",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
    key: {
      name: "key",
      type: "string",
      writeable: true,
      default: null,
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
