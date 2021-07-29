class Seeders::Stocks < Seeders::ScrapperBasedSeeder
  def seed
    sectors_data[:sectors].each do |sector_data|
      sector = Sector.where(name: sector_data[:name]).first_or_create

      sector_data[:companies].each do |company_data|
        company = Company.where(name: company_data[:name], sector: sector).first_or_create

        company_data[:stocks].each do |stock_data|
          Stock.where(code: stock_data[:code], company_id: company.id).first_or_create
        end
      end
    end
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
