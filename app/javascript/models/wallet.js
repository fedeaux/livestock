import Model from "braindamage/model";
import WalletSchema from 'generated/schemas/wallet';

class Wallet extends Model {
  static schema = WalletSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default Wallet.define();
