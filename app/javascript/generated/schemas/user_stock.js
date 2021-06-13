export default {
  attributes: {
    id: {
      type: "integer",
      writeable: false,
      default: null,
    },
    userId: {
      type: "integer",
      writeable: true,
      default: null,
    },
    stockId: {
      type: "integer",
      writeable: true,
      default: null,
    },
    createdAt: {
      type: "datetime",
      writeable: true,
      default: null,
    },
    updatedAt: {
      type: "datetime",
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
      name: "ActiveRecord::Validations::PresenceValidator",
      // TODO: Print this prettier
      options: {"message":"required"},
      attributes: ["user"],
    },
    {
      name: "ActiveRecord::Validations::PresenceValidator",
      // TODO: Print this prettier
      options: {"message":"required"},
      attributes: ["stock"],
    }
  ]
}
