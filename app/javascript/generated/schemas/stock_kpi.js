export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    price: {
      name: "price",
      type: "decimal",
      writeable: true,
      default: null,
    },
    dy: {
      name: "dy",
      type: "decimal",
      writeable: true,
      default: null,
    },
    pToE: {
      name: "pToE",
      type: "decimal",
      writeable: true,
      default: null,
    },
    pToEv: {
      name: "pToEv",
      type: "decimal",
      writeable: true,
      default: null,
    },
    pToEbit: {
      name: "pToEbit",
      type: "decimal",
      writeable: true,
      default: null,
    },
    evToEbit: {
      name: "evToEbit",
      type: "decimal",
      writeable: true,
      default: null,
    },
    ndToEbit: {
      name: "ndToEbit",
      type: "decimal",
      writeable: true,
      default: null,
    },
    ndToEv: {
      name: "ndToEv",
      type: "decimal",
      writeable: true,
      default: null,
    },
    psr: {
      name: "psr",
      type: "decimal",
      writeable: true,
      default: null,
    },
    roe: {
      name: "roe",
      type: "decimal",
      writeable: true,
      default: null,
    },
    roa: {
      name: "roa",
      type: "decimal",
      writeable: true,
      default: null,
    },
    roic: {
      name: "roic",
      type: "decimal",
      writeable: true,
      default: null,
    },
    bvps: {
      name: "bvps",
      type: "decimal",
      writeable: true,
      default: null,
    },
    eps: {
      name: "eps",
      type: "decimal",
      writeable: true,
      default: null,
    },
    pToBv: {
      name: "pToBv",
      type: "decimal",
      writeable: true,
      default: null,
    },
    pToEps: {
      name: "pToEps",
      type: "decimal",
      writeable: true,
      default: null,
    },
    date: {
      name: "date",
      type: "date",
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
  },
  names: {
    singularUnderscore: "stock_kpi",
    pluralUnderscore: "stock_kpis",
    singularDash: "stock-kpi",
    pluralDash: "stock-kpis",
    singularCamel: "stockKpi",
    pluralCamel: "stockKpis",
    singularClass: "StockKpi",
    pluralClass: "StockKpis",
  },
  validators: [
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
