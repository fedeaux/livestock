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
    category: {
      name: "category",
      type: "string",
      writeable: true,
      default: "0",
    },
    currency: {
      name: "currency",
      type: "string",
      writeable: true,
      default: "0",
    },
    sector: {
      name: "sector",
      type: "string",
      writeable: true,
      default: null,
    },
    subsector: {
      name: "subsector",
      type: "string",
      writeable: true,
      default: null,
    },
    segment: {
      name: "segment",
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
    },
  ],
  enums: {
    category: {
      name: "category",
      valueMap: {
        market: 0,
        realEstate: 1,
      },
      options: {
      },
    },
    currency: {
      name: "currency",
      valueMap: {
        brl: 0,
        usd: 1,
      },
      options: {
      },
    },
  },
}
