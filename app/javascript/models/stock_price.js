import Model from "braindamage/model";
import StockPriceSchema from 'generated/schemas/stock_price';

class StockPrice extends Model {
  static schema = StockPriceSchema;
  static modelName = 'StockPrice';

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default StockPrice.define();
