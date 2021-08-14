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
    totalPrice: {
      name: "totalPrice",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
    totalMarketPrice: {
      name: "totalMarketPrice",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
    totalEarnings: {
      name: "totalEarnings",
      type: "decimal",
      writeable: true,
      default: "0.0",
    },
    currentPayout: {
      name: "currentPayout",
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
    marketPriceRatio: {
      name: "marketPriceRatio",
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
    currentPayoutRate: {
      name: "currentPayoutRate",
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
