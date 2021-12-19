class PriceAlerts::SyncDividendsSpreadsheetJob < ApplicationJob
  def perform
    stocks_dpa = []

    (2..worksheet.num_rows).each do |i|

      break if worksheet[i, 1].strip.blank?

      stocks_dpa.push(
        {
          stock_code: worksheet[i, 1].strip,
          dpa: worksheet[i, 2].gsub("$", "").strip.to_f,
        })
    end

    File.open(Rails.root.join("app/javascript/data/projected_dividends.json").to_s, "w") do |f|
      f.write stocks_dpa.to_json
    end

    nil
  end

  def session
    @session ||= GoogleDrive::Session.from_config("config.json")
  end

  def worksheet
    @worksheet ||= session.spreadsheet_by_key("1HnWicYIjRqrK35Sik3gnjhUmpamgbGPEv0P51wjXnvw").worksheets.find do |ws|
      ws.title == "Dividends"
    end
  end
end
