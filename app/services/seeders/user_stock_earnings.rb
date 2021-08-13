class Seeders::UserStockEarnings
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def seed
    user_stock_earnings_data.each do |user_stock_earning_attributes|
      code = user_stock_earning_attributes.code
      stock = Stock.where(code: code).first

      unless stock
        sector = Sector.where(name: "Manual").first_or_create
        company = Company.where(name: code, sector: sector).first_or_create
        stock = Stock.where(code: code, company_id: company.id).first_or_create
      end

      user_stock = user.user_stocks.where(stock_id: stock.id).first_or_create
      user_stock.user_stock_earnings.where(user_stock_earning_attributes.to_h.except(:code)).first_or_create
    end
  end

  def session
    @session ||= GoogleDrive::Session.from_config("config.json")
  end

  def user_stock_earnings_data
    ws = session.spreadsheet_by_key("1HnWicYIjRqrK35Sik3gnjhUmpamgbGPEv0P51wjXnvw").worksheets.find do |ws|
      ws.title == "Earnings"
    end

    (1..ws.num_rows).map do |i|
      OpenStruct.new(
        code: ws[i, 1].strip,
        stock_count: ws[i, 2].to_i,
        total: ws[i, 3].gsub("R$", "").strip.to_f,
        received_at: Date.strptime(ws[i, 4], "%d/%m/%Y")
        # TODO: Nature
      )
    end
  end
end
