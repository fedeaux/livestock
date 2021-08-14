import Model from "braindamage/model";
import UserStockEarningSchema from 'generated/schemas/user_stock_earning'

class UserStockEarning extends Model {
  static schema = UserStockEarningSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default UserStockEarning.define();
