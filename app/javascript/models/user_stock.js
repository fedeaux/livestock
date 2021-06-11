import Model from "views/react_on_rails/framework/model";
import UserStockSchema from "views/react_on_rails/generated/schemas/user_stock";

export default class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}
