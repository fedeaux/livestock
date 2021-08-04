import Model from "braindamage/model";
import StockSchema from "generated/schemas/stock";
import StockEarning from "models/stock_earning";

class Stock extends Model {
  static schema = StockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      stockEarnings: {
        type: "belongs_to",
        class: StockEarning
      }
    };
  }

  get clientPath() {
    return `/stocks/${this.code}`
  }
}

export default Stock.define();
