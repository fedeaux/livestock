require_relative "./lib/endpoint"

class Braindamage::ApiGenerator < Rails::Generators::Base
  BASE_PATH = "/lib/generators/braindamage/api/".freeze # ugly!
  source_root File.expand_path("generators/", __dir__)

  def all
    endpoints.each do |endpoint|
      puts endpoint.generate
    end
  end

  private

  def endpoints
    @endpoints ||= Rails.application.routes.routes.map do |route|
      Endpoint.new route
    end.select(&:generateable?)
  end
end
