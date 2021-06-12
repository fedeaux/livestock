export default {
  attributes: {
    id: { type: "integer" },
    name: { type: "string" },
    code: { type: "string" },
    updatedAt: { type: "datetime" },
    link: { type: "string" },
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
  }
}
