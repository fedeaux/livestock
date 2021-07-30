import Model from "braindamage/model";
import UserStockSchema from "generated/schemas/user_stock";

class UserStock extends Model {
  static schema = UserStockSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      totalPrice: {
        type: "decimal"
      },
      currentMarketResult: {
        type: "decimal"
      },
      currentPayout: {
        type: "decimal"
      }
    };
  }

  get clientPath() {
    return `/stocks/${this.code}`
  }
}

export default UserStock.define();
