import Model from "braindamage/model";
import WalletSchema from 'generated/schemas/wallet';
import UserStock from "models/user_stock";

class Wallet extends Model {
  static schema = WalletSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      userStocks: {
        type: "belongs_to",
        class: UserStock
      }
    };
  }
}

export default Wallet.define();
