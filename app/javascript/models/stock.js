import Model from "braindamage/model";
import StockSchema from "generated/schemas/stock";

class Stock extends Model {
  static schema = StockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default Stock.define();
