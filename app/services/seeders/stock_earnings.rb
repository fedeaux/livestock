class Seeders::StockEarnings < Seeders::BaseSeeder
  def seed
    @month = "2021-08"
    seed_market_stock_earnings
  end

  def seed_market_stock_earnings
    codes = File.read("app/services/seeders/data/status_invest/market/#{@month}.csv").split("\n")[1..-1].map do |line|
      line.split(";").first
    end

    failures = []

    stocks = codes.map do |code|
      stock = Stock.find_by_id_or_code(code)

      unless stock
        sector = Sector.where(name: "Manual").first_or_create
        company = Company.where(name: code, sector: sector).first_or_create
        stock = Stock.where(code: code, company_id: company.id).first_or_create
      end

      ap stock.code
      stock_earning_data(stock).each do |stock_earning_attributes|
        stock_earning = stock.stock_earnings.where(stock_earning_attributes).first_or_initialize

        unless stock_earning.save
          failures << stock_earning_attributes
        end
      end

      stock
    end

    ap failures

    stocks.each do |stock|
      puts stock.status_invest_url
      puts "http://localhost:3000/stocks/#{stock.code}"
    end
  end

  def stock_earning_data(stock)
    code = stock.code
    cache_key = "stock_earnings/status_invest/#{@month}/#{code}.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s
    cached = fetch_cache cache_file

    unless cached
      begin
        earning_entries = []

        browser.visit stock.status_invest_url
        sleep 1
        browser.scroll_to browser.find(".pagination.mb-0", match: :first).all("li a").last
        sleep 1
        number_of_pages = browser.evaluate_script("$('.pagination:first a').length").to_i
        # ap "number_of_pages #{number_of_pages}"
        (number_of_pages - 2).times do
          extract_earnings(Nokogiri::HTML(browser.html), earning_entries)
          browser.find(".pagination.mb-0", match: :first).all("li a").last.click
          sleep 1
        end

        cached = add_to_cache(cache_file, { earning_entries: earning_entries }.to_json)
      rescue StandardError => e
        ap e
        return []
      end
    end

    JSON.parse(cached)['earning_entries'].map do |attributes|
      original_category = attributes['category'].downcase

      category = if original_category.include? 'divide'
                   :dividends
                 elsif original_category.include? 'jcp'
                   :interest_on_equity
                 elsif original_category.include? 'amort'
                   :amortization
                 elsif original_category.include? 'tribu'
                   :taxed_income
                 elsif original_category.include? 'rendim'
                   :earning
                 end

      # received_at = parse_dmy_string(attributes['received_at'])

      # unless received_at
      #   puts parse_dmy_string(attributes['received_at'])
      #   byebug
      # end

      {
        category: category,
        per_stock: attributes['per_stock'],
        received_at: parse_dmy_string(attributes['received_at'])
      }
    end
  end

  def extract_earnings(doc, earning_entries)
    earnings_table = doc.css('table').first

    earnings_table.css('tr').each do |tr|
      tds = tr.css('td')

      next unless tds.count > 0

      earning_entries.push({
                             category: tds[0].text,
                             received_at: tds[1].text,
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
