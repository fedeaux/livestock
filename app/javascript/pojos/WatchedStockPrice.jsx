import Model from "braindamage/model";

class WatchedStockPrice extends Model {
  static schema = {
    modelName: "WatchedStockPrice",
    attributes: {
      code: {
        name: "code",
        type: "string",
        writeable: true,
        default: null,
      },
      currentPrice: {
        name: "currentPrice",
        type: "decimal",
        writeable: true,
        default: null,
      },
      minPrice: {
        name: "minPrice",
        type: "decimal",
        writeable: true,
        default: null,
      },
      maxPrice: {
        name: "maxPrice",
        type: "decimal",
        writeable: true,
        default: null,
      },
    },
  };

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default WatchedStockPrice.define();
