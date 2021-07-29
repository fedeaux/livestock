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
    code: {
      name: "code",
      type: "string",
      writeable: true,
      default: null,
    },
    updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
    risk: {
      name: "risk",
      type: "string",
      writeable: true,
      default: null,
    },
    link: {
      name: "link",
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
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "Please provide a code",
      },
      attributes: [
        "code",
      ],
    }
  ],
  enums: {
    risk: {
      name: "risk",
      valueMap: {
        none: 0,
        low: 10,
        moderate: 20,
        high: 30,
        incredible: 40,
      },
      options: {
        suffix: true,
      },
    },
  },
}
