class Seeders::Stocks < Seeders::ScrapperBasedSeeder
  def seed
    seed_funds
    seed_earnings
  end

  def seed_funds
    sectors_data[:sectors].each do |sector_data|
      sector = Sector.where(name: sector_data[:name], category: :market).first_or_create

      sector_data[:companies].each do |company_data|
        company = Company.where(name: company_data[:name], sector: sector).first_or_create

        company_data[:stocks].each do |stock_data|
          Stock.where(code: stock_data[:code], company_id: company.id).first_or_create
        end
      end
    end
  end

  def seed_earnings
    parsed_html_file('all_earnings').css('.info.w-100').each do |row|
      code = row.css("h4 span").first.text.strip

      stock = Stock.find_by(code: code)

      next unless stock

      # category = row.css("div div")[4].css("span.value")&.text&.strip == "JCP" ? :interest_on_equity : :dividends
      category = row.css("div div")[4].css("span.value")&.text&.strip == "JCP" ? 1 : 0
      received_at = parse_dmy_string(row.css("div div")[3].css("span.value")&.text)

      stock.stock_earnings.where(
        received_at: received_at,
        category: category,
        per_stock: parse_money_string(row.css("div div span")&.first&.text)
      ).first_or_create
    end

    nil
  end

  def sectors_data
    sectors = []

    parsed_html('https://www.infomoney.com.br/cotacoes/empresas-b3')
      .css('.list-companies')
      .each do |list|
        sector = { name: list.css('h2').text, companies: [] }

        list.css('tbody tr').each do |tr|
          company = {
            name: tr.css('td').first.text,
            stocks: tr.css('td a')[1..-1].map(&:text).map { |code| {code: code} }
          }

          sector[:companies].push company
        end

        sectors.push(sector)
      end

    { sectors: sectors }
  end
end
