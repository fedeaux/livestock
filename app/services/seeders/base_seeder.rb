class Seeders::BaseSeeder
  CACHE_DIR = "tmp/cache/seeders/"
  DATA_DIR = "app/services/seeders/data/"

  def add_to_cache(cache_file, contents)
    dir = cache_file.split('/')[0..-2].join '/'
    FileUtils.mkdir_p dir

    File.open cache_file, "w" do |f|
      f.write contents
    end

    contents
  end

  def fetch_cache(cache_file)
    return File.read cache_file if File.exist? cache_file
  end

  def nuke_cache(cache_file)
    FileUtils.rm(cache_file)
  end

  def stocks_with_user_stocks
    Stock.find(UserStock.distinct.pluck(:stock_id))
  end

  def parse_dmy_string(date_string)
    Date.strptime(date_string&.strip, "%d/%m/%Y")
  rescue
    nil
  end

  def parse_ym_string(date_string)
    Date.strptime(date_string&.strip, "%Y-%m")
  rescue
    nil
  end

  def parse_money_string(money_string)
    partial_money_string = money_string&.gsub(/[^\d\.\,]/, "")&.gsub(",", '.')&.strip

    return unless partial_money_string

    partial_money_string.to_f.round(2)
  end
end
