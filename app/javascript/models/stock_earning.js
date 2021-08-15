import Model from "braindamage/model";
import StockEarningSchema from 'generated/schemas/stock_earning';

class StockEarning extends Model {
  static schema = StockEarningSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default StockEarning.define();
