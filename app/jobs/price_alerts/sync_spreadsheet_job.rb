class PriceAlerts::SyncSpreadsheetJob < ApplicationJob
  def perform
    (2..worksheet.num_rows).map do |i|
      StockPriceAlert.new(
        stock_code: worksheet[i, 1].strip,
        buy_price: worksheet[i, 2].gsub("$", "").strip.to_f,
        sell_price: worksheet[i, 3].gsub("$", "").strip.to_f,
        stop_price: worksheet[i, 4].gsub("$", "").strip.to_f
      )
    end.map(&:attributes).tap do |stock_price_alerts_attributes|
      File.open(Rails.root.join("tmp/stock_price_alerts_attributes.json").to_s, "w") do |f|
        f.write stock_price_alerts_attributes.to_json
      end
    end
  end

  def session
    @session ||= GoogleDrive::Session.from_config("config.json")
  end

  def worksheet
    @worksheet ||= session.spreadsheet_by_key("1HnWicYIjRqrK35Sik3gnjhUmpamgbGPEv0P51wjXnvw").worksheets.find do |ws|
      ws.title == "Price Alerts"
    end
  end
end
