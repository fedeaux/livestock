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
    companyId: {
      name: "companyId",
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
    category: {
      name: "category",
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
        message: "required",
      },
      attributes: [
        "company",
      ],
    },
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
  },
}
