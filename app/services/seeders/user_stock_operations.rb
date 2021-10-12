class Seeders::UserStockOperations
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def seed
    user_stock_operations_data.each do |user_stock_operation_attributes|
      code = user_stock_operation_attributes.code
      stock = Stock.ensure code

      user_stock = user.user_stocks.where(stock_id: stock.id).first_or_create
      user_stock.wallet ||= Wallet.find_by(key: 'dividends')
      user_stock.save

      user_stock.user_stock_operations.where(user_stock_operation_attributes.to_h.except(:code)).first_or_create
    end
  end

  def session
    @session ||= GoogleDrive::Session.from_config("config.json")
  end

  def user_stock_operations_data
    ws = session.spreadsheet_by_key("1HnWicYIjRqrK35Sik3gnjhUmpamgbGPEv0P51wjXnvw").worksheets.find do |ws|
      ws.title == "Operations"
    end

    (2..ws.num_rows).map do |i|
      ws[14].length.strip == 0 ?
        OpenStruct.new(
          code: ws[i, 2].strip,
          nature: { Compra: "buy", Venda: "sell" }[ws[i, 4].strip.to_sym],
          stock_count: ws[i, 9].to_i,
          stock_price: ws[i, 11].gsub("R$", "").strip.to_f,
          executed_at: Date.strptime(ws[i, 12].split(" ").first.strip, "%d/%m/%Y")
        ) : nil
    end.compact
  end
end
