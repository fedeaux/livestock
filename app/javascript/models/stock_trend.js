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

  y(x) {
    return this.slope * x + this.intercept;
  }

  priceAt(day = new Date()) {
    return this.y(this.dayToX(day));
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

    return difference/(this.deviation * 2);
  }

  deviationRatio() {
    return this.deviation / this.priceAt();
  }
}

export default StockTrend.define();
