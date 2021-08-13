class Seeders::StockEarnings < Seeders::BaseSeeder
  def seed
    seed_earnings
  end

  def seed_earnings
    File.read("app/services/seeders/data/statusinvest-busca-avancada.csv").split("\n")[1..-1].each do |line|
      stock_earning_data(line.split(";").first)
    end
  end

  def stock_earning_data(code)
    cache_key = "stock_earnings/status_invest/#{Date.today.strftime("%m-%Y")}/#{code}.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s
    cached = fetch_cache cache_file

    unless cached
      begin
        earning_entries = []

        url = "https://statusinvest.com.br/acoes/#{code}"
        browser.visit url
        sleep 1
        browser.scroll_to browser.find(".pagination.mb-0", match: :first).all("li a").last
        sleep 1
        number_of_pages = browser.evaluate_script("$('.pagination:first a').length").to_i
        ap "number_of_pages #{number_of_pages}"
        (number_of_pages - 2).times do
          extract_earnings(Nokogiri::HTML(browser.html), earning_entries)
          browser.find(".pagination.mb-0", match: :first).all("li a").last.click
          sleep 1
        end

        cached = add_to_cache(cache_file, { earning_entries: earning_entries }.to_json)
      rescue
        return nil
      end
    end

    parsed_cache = JSON.parse(cached)
    ap parsed_cache
  end

  def extract_earnings(doc, earning_entries)
    earnings_table = doc.css('table').first

    earnings_table.css('tr').each do |tr|
      tds = tr.css('td')

      next unless tds.count > 0

      earning_entries.push({
                             category: tds[0].text,
                             received_at: tds[2].text,
                             per_stock: tds[3].text.gsub(",", ".").to_f,
                           })
    end
  end

  def browser
    unless @browser
      Capybara.register_driver :selenium do |app|
        Capybara::Selenium::Driver.new(app, browser: :chrome)
      end
      Capybara.javascript_driver = :chrome
      Capybara.configure do |config|
        config.default_max_wait_time = 10 # seconds
        config.default_driver = :selenium
      end

      @browser = Capybara.current_session
    end

    @browser
  end
end
