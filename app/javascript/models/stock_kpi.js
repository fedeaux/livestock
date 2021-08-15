import Model from "braindamage/model";
import StockKpiSchema from 'generated/schemas/stock_kpi';

class StockKpi extends Model {
  static schema = StockKpiSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default StockKpi.define();
