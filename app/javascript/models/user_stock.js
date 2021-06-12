import Model from "framework/model";
import UserStockSchema from "generated/schemas/user_stock";

export default class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }


  static singularUnderscoreName = "user_stock";

  static pluralUnderscoreName = "user_stocks";

  static singularDashName = "user-stock";

  static pluralDashName = "user-stocks";

  static singularCamelName = "userStock";

  static pluralCamelName = "userStocks";

  static singularClassName = "UserStock";

  static pluralClassName = "UserStocks";

}
