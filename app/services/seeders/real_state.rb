class Seeders::RealState < Seeders::ScrapperBasedSeeder
  def seed
    seed_funds
    seed_earnings
  end

  def seed_funds
    real_states_data.each do |real_state_data|
      sector = Sector.where(name: real_state_data[:sector_name], category: :real_state).first_or_create
      company = Company.where(name: real_state_data[:company_name], sector_id: sector.id).first_or_create

      stock = Stock.where(
        code: real_state_data[:code],
        company_id: company.id
      ).first_or_create

      stock.update(name: real_state_data[:name])
    end
  end

  def seed_earnings
    Stock.real_state.each do |stock|
      earnings_data(stock).each do |stock_earning_attributes|
        stock_earning = stock.stock_earnings.where(received_at: stock_earning_attributes[:received_at]).first_or_create
        stock_earning.update(stock_earning_attributes)
      end
    end
  end

  def earnings_data(stock)
    tbody = parsed_html("https://fiibrasil.com/fundo/#{stock.code}")
      .css("tbody")
      .last

    return [] unless tbody

    tbody.css("tr")
      .map do |tr|
        {
          per_stock: parse_money_string(tr.css("td")[1]&.text),
          received_at: parse_dmy_string(tr.css("td")[3]&.text)
        }
      end.select do |tr|
        tr[:per_stock] && tr[:received_at]
      end
  rescue StandardError => e
    puts e.inspect
    puts "Broken for #{stock.code} https://fiibrasil.com/fundo/#{stock.code}"
  end

  def real_states_data
    parsed_html('https://www.clubefii.com.br/fundo_imobiliario_lista')
      .css('tr')
      .map do |tr|
        tds = tr.css('td')
        code = tds.first&.css('a')&.text&.strip
        name = tds[1]&.css('a')&.text&.strip
        sector_name = tds[5]&.css('a')&.text&.strip&.humanize
        company_name = tds[6]&.css('a')&.text&.strip&.humanize

        { code: code, name: name, sector_name: sector_name, company_name: company_name }
      end.select do |real_state_data|
        real_state_data[:code]
      end
  end
end
