import Model from "framework/model";
import StockSchema from "generated/schemas/stock";

export default class Stock extends Model {
  static schema = StockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }


  static singularUnderscoreName = "stock";

  static pluralUnderscoreName = "stocks";

  static singularDashName = "stock";

  static pluralDashName = "stocks";

  static singularCamelName = "stock";

  static pluralCamelName = "stocks";

  static singularClassName = "Stock";

  static pluralClassName = "Stocks";

}
