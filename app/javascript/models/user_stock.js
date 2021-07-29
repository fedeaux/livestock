import Model from "braindamage/model";

// <%= singular_class_name %>Schema
import UserStockSchema from "generated/schemas/user_stock";

class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default UserStock.define();

// 3.0.1 :019 > UserStock.reflections.values.last.name
//   => :stock
// 3.0.1 :020 > UserStock.reflections.values.last.macro
//   => :belongs_to
