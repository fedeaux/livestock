require 'fileutils'

class Seeders::ScrapperBasedSeeder
  CACHE_DIR = "tmp/cache/seeders/"

  def cache_file_name(url)
    cache_key = url.gsub(/[^\w]+/, '-')

    Rails.root.join CACHE_DIR, cache_key
  end

  def add_to_cache(cache_file, contents)
    FileUtils.mkdir_p CACHE_DIR

    File.open cache_file, "w" do |f|
      f.write contents
    end
  end

  def fetch(url)
    cache_file = cache_file_name(url)

    if File.exist? cache_file
      return File.read cache_file
    end

    html = HTTParty.get(url).force_encoding('utf-8')
    add_to_cache cache_file, html

    html
  end

  def parsed_html(url)
    Nokogiri::HTML fetch url
  end
end
