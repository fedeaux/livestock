import Model from "braindamage/model";
import UserStockOperationSchema from "generated/schemas/user_stock_operation";

class UserStockOperation extends Model {
  static schema = UserStockOperationSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default UserStockOperation.define();
