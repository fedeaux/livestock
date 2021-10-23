import Model from "braindamage/model";
import WalletSchema from 'generated/schemas/wallet';

class Wallet extends Model {
  static schema = WalletSchema;
  static modelName = 'Wallet';

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default Wallet.define();
