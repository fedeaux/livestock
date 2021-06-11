import Model from "views/react_on_rails/framework/model";
import StockSchema from "views/react_on_rails/generated/schemas/stock";

export default class Stock extends Model {
  static schema = StockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}
