export default {
  attributes: {
    id: {
      type: "integer",
      writeable: false,
      default: null,
    },
    name: {
      type: "string",
      writeable: true,
      default: null,
    },
    code: {
      type: "string",
      writeable: true,
      default: null,
    },
    updatedAt: {
      type: "datetime",
      writeable: true,
      default: null,
    },
    link: {
      type: "string",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "stock",
    pluralUnderscore: "stocks",
    singularDash: "stock",
    pluralDash: "stocks",
    singularCamel: "stock",
    pluralCamel: "stocks",
    singularClass: "Stock",
    pluralClass: "Stocks",
  },
  validators: [
    {
      name: "ActiveRecord::Validations::PresenceValidator",
      // TODO: Print this prettier
      options: {"message":"Please provide a code"},
      attributes: ["code"],
    }
  ]
}
