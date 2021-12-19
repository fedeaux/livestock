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
      projectedDividendsPerShare: {
        name: "projectedDividendsPerShare",
        type: "decimal",
        writeable: true,
        default: 0,
      },
    },
  };

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }

  get dyAtPrice() {
    if (this.projectedDividendsPerShare && this.currentPrice) {
      return this.projectedDividendsPerShare / this.currentPrice;
    }

    return 0;
  }

  get lowerDy() {
    return (Math.ceil(((this.dyAtPrice - 0.005) * 1000) / 5) * 5) / 1000;
  }

  get lowerDyPrice() {
    return this.projectedDividendsPerShare / this.lowerDy;
  }

  get upperDy() {
    return (Math.ceil((this.dyAtPrice * 1000) / 5) * 5) / 1000;
  }

  get upperDyPrice() {
    return this.projectedDividendsPerShare / this.upperDy;
  }
}

export default WatchedStockPrice.define();
