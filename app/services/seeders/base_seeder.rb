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
end
