import Model from "braindamage/model";
import StockTrendSchema from 'generated/schemas/stock_trend';
import { getTime } from "date-fns";

class StockTrend extends Model {
  static schema = StockTrendSchema;
  static modelName = 'StockTrend';

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }

  dayToX(day) {
    return getTime(day) / (1000 * 60 * 60 * 24);
  }

  priceAt(day) {
    return this.slope * this.dayToX(day) + this.intercept;
  }

  supportPrice(day = new Date()) {
    return this.priceAt(day) - this.deviation;
  }

  resistancePrice(day = new Date()) {
    return this.priceAt(day) + this.deviation;
  }

  priceTrendPosition(price, day = new Date()) {
    const supportPrice = this.supportPrice(day);
    const difference = price - supportPrice;

    return difference/supportPrice;
  }
}

export default StockTrend.define();
