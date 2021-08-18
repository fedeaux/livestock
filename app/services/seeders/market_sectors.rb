class Seeders::MarketSectors < Seeders::BaseSeeder
  def seed
    cache_key = "market_sectors/status_invest.json"
    cache_file = Rails.root.join(CACHE_DIR, cache_key).to_s
    cached = fetch_cache cache_file

    unless cached
      sectors = {}

      begin
        browser.visit "https://statusinvest.com.br/acoes/busca-avancada"
        sleep 1
        wrapper = browser.all(".select-wrapper")[1]
        wrapper.all('.select-dropdown').first.click
        options_count = wrapper.all('li span').count

        options_count.times do |i|
          option = wrapper.all('li span')[i]
          sector_name = option.text
          next if sector_name == '-- Todos setores --'

          option.click
          sectors[sector_name] ||= []

          second_wrapper = browser.all(".select-wrapper")[2]
          second_wrapper.all('.select-dropdown').first.click
          second_wrapper.all('li span').each do |li_span|
            next if li_span.text == '-- Selecione um setor --'
            sectors[sector_name] << li_span.text
          end

          sleep 1
          wrapper.all('.select-dropdown').first.click
        end

        cached = add_to_cache(cache_file, { sectors: sectors }.to_json)
      rescue StandardError => e
        ap e
        return []
      end
    end

    ap cached
    browser.execute_script "window.close();"
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
