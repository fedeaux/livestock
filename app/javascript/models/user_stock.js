import Model from "braindamage/model";
import UserStockSchema from "generated/schemas/user_stock";

class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default UserStock.define();
