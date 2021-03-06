export default {
  modelName: 'UserStockOperation',
  attributes: {
      code: {
      name: "code",
      type: "string",
      writeable: true,
      default: null,
    },
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      executedAt: {
      name: "executedAt",
      type: "date",
      writeable: true,
      default: null,
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      nature: {
      name: "nature",
      type: "string",
      writeable: true,
      default: null,
    },
      stock: {
      name: "stock",
      type: "has_one",
      writeable: true,
      default: null,
      model: "Stock",
    },
      stockCount: {
      name: "stockCount",
      type: "integer",
      writeable: true,
      default: null,
    },
      stockPrice: {
      name: "stockPrice",
      type: "decimal",
      writeable: true,
      default: null,
    },
      total: {
      name: "total",
      type: "decimal",
      writeable: true,
      default: null,
    },
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      userStock: {
      name: "userStock",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "UserStock",
    },
      userStockId: {
      name: "userStockId",
      type: "integer",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "user_stock_operation",
    pluralUnderscore: "user_stock_operations",
    singularDash: "user-stock-operation",
    pluralDash: "user-stock-operations",
    singularCamel: "userStockOperation",
    pluralCamel: "userStockOperations",
    singularClass: "UserStockOperation",
    pluralClass: "UserStockOperations",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "user_stock",
      ],
    },
  ],
  enums: {
    nature: {
      name: "nature",
      valueMap: {
        buy: 0,
        sell: 10,
        bonus: 20,
      },
      options: {
      },
    },
  },
}
