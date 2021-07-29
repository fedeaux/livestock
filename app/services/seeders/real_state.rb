class Seeders::RealState < Seeders::ScrapperBasedSeeder
  def seed
    real_states_data.each do |real_state_data|
      sector = Sector.where(name: real_state_data[:sector_name]).first_or_create
      company = Company.where(name: real_state_data[:company_name], sector_id: sector.id).first_or_create

      stock = Stock.where(
        code: real_state_data[:code],
        company_id: company.id
      ).first_or_create

      stock.update(name: real_state_data[:name], category: :real_state)
    end
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
