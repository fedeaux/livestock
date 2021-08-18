import Model from "braindamage/model";
import UserStockSchema from 'generated/schemas/user_stock';
import Stock from "models/stock";
import UserStockOperation from "models/user_stock_operation";
import UserStockEarning from "models/user_stock_earning";

// BD-TODO: Add Relationships automatically
class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      stock: {
        type: "belongs_to",
        class: Stock
      },
      userStockOperations: {
        type: "belongs_to",
        class: UserStockOperation
      },
      userStockEarnings: {
        type: "belongs_to",
        class: UserStockEarning
      }
    };
  }

  get clientPath() {
    return `/stocks/${this.code}`
  }
}

export default UserStock.define();
