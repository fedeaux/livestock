import Model from "braindamage/model";
import UserStockDividendSchema from "generated/schemas/user_stock_dividend";

class UserStockDividend extends Model {
  static schema = UserStockDividendSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default UserStockDividend.define();
