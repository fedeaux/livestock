import Model from "braindamage/model";
import UserStockSchema from "generated/schemas/user_stock";
import Stock from "models/stock";

class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      stock: {
        type: "belongs_to",
        class: Stock
      }
    };
  }
}

export default UserStock.define();
