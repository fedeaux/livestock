class Seeders::StockEarnings < Seeders::BaseSeeder
  def seed
    @month = "2021-08"
    seed_brl_market_stock_earnings
    # seed_brl_market_stock_sector_subsector_and_segment
    # seed_brl_real_estate_stock_segment
  end

  def seed_brl_market_stock_earnings
    codes = File.read("app/services/seeders/data/status_invest/market/#{@month}.csv").split("\n")[1..-1].map do |line|
      line.split(";").first
    end

    failures = []

    codes.map do |code|
      stock = Stock.ensure code, category: :market, currency: :brl
      ap code

      stock_earning_data(stock).each do |stock_earning_attributes|
        stock_earning = stock.stock_earnings.where(stock_earning_attributes).first_or_initialize

        unless stock_earning.save
          failures << stock_earning_attributes
        end
      end

      stock
    end

    ap failures
  end

  def seed_brl_market_stock_sector_subsector_and_segment
    Stock.brl.market.where(sector: nil).each do |stock|
      unless stock.code.end_with?('F') || stock.code.end_with?('34')
        browser.visit stock.status_invest_url

        begin
          texts = browser
                    .find('.card.bg-main-gd-h.white-text.rounded.ov-hidden', match: :first)
                    .all("a.white-text.d-flex")
                    .map(&:text)
                    .map { |text| text.split("\n").first }
        rescue
          next
        end

        stock.update(
          sector: texts[0],
          subsector: texts[1],
          segment: texts[2],
        )
      end
    end
  end

  def seed_brl_real_estate_stock_segment
    Stock.brl.real_estate.where(segment: nil).each do |stock|
      unless stock.code.end_with?('F') || stock.code.end_with?('34')
        browser.visit stock.status_invest_url

        begin
          texts = browser
                    .all('.card.bg-main-gd-h.white-text.rounded')[2]
                    .all("a.white-text.d-flex")
                    .map(&:text)
                    .map { |text| text.split("\n").first }
        rescue
          next
        end

        stock.update(
          sector: 'Fundos Imobiliarios',
          subsector: 'Fundos Imobiliarios',
          segment: texts[0],
        )
      end
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
        provided_at: parse_dmy_string(attributes['provided_at']),
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
                             provided_at: tds[1].text,
                             received_at: tds[2].text,
                             per_stock: tds[3].text.gsub(",", ".").to_f,
                           })
    end
  end

  def browser
    unless @browser
      options = Selenium::WebDriver::Chrome::Options.new

      Capybara.register_driver :selenium do |app|
        options.add_argument('--headless')
        # options.add_argument('--disable-gpu')
        # options.add_argument('--window-size=1280,800')

        Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
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
